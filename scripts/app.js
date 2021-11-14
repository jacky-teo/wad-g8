// Heroku Redirect
var redirect_uri = "https://audiophiles-wad.herokuapp.com/spotify";

// var redirect_uri = "https://vasn.github.io/wad-g8/spotify.html";

// vas's redirect
// var redirect_uri = "http://localhost/is216/wad-g8/spotify.html";
// shya's redirect
// var redirect_uri = 'http://localhost/wad-g8/spotify.html';

var client_id = "eb7fe60f242a47c99400bbbfae58b595";
var client_secret = "bd6587ae3ac04e6d94be304b6f5edda7";

var access_token = null;
var refresh_token = null;
var currentPlaylist = "";

// Add Event Listeners
document.getElementById('login').addEventListener('click', function () {
    requestAuthorization();
});
document.getElementById('playlists').addEventListener('input', function () {
    fetchTracks();
});
document.getElementById('playlists').addEventListener('input', function () {
    play();
});
document.getElementById('tracks').addEventListener('input', function () {
    play();
});
localStorage.setItem('trackid', '');
localStorage.setItem('songlength', '');

const AUTHORIZE = "https://accounts.spotify.com/authorize"
const TOKEN = "https://accounts.spotify.com/api/token";
const PLAYLISTS = "https://api.spotify.com/v1/me/playlists";
const DEVICES = "https://api.spotify.com/v1/me/player/devices";
const PLAY = "https://api.spotify.com/v1/me/player/play";
const PLAYER = "https://api.spotify.com/v1/me/player";
const TRACKS = "https://api.spotify.com/v1/playlists/{{PlaylistId}}/tracks";
const CURRENTLYPLAYING = "https://api.spotify.com/v1/me/player/currently-playing";
const ANALYSIS = "  https://api.spotify.com/v1/audio-analysis/{id}";


function onPageLoad() {
    if (window.location.search.length > 0) {
        handleRedirect();
    }
    else {
        access_token = localStorage.getItem("access_token");
        if (access_token == null) {
            // we don't have an access token so present token section
            document.getElementById('app').style.display = 'none';
        }
        else {
            // we have an access token so present app section
            document.getElementById("tokenSection").style.display = 'none';
            document.getElementById('app').style.display = 'block';

            refreshDevices();
            refreshPlaylists();
        }
    }
}

//show #notice only once 
document.getElementById('okBtn').onclick = function () {

    document.getElementById("modals").href = '#playerModal'
    return false;
};

//playToggle vue instance
const playToggle = Vue.createApp({
    data() {
        return {
            playToggle: true
        }
    }
}).mount("#playback")

let duration = 0;
var position = 0;
var percentage = 0;
var currState = true;
var myVar = setInterval(function () {
    position += currState ? 0 : 100;
    localStorage.setItem("progress", position)
    percentage = (position / duration) * 100
    document.getElementById('pbar').style.width = percentage + "%"
}, 100);


//spotify web sdk
window.onSpotifyWebPlaybackSDKReady = () => {

    if (access_token != null) {
        //token unique to different users
        //should get token on behalf of users through user authentication
        const token = localStorage.access_token;

        const player = new Spotify.Player({
            name: 'Playing here!',             //device name on spotify app
            getOAuthToken: cb => { cb(token); },
            volume: 0.5
        });

        // Ready
        player.addListener('ready', ({ device_id }) => {
            console.log('Ready with Device ID', device_id);
            refreshDevices();
        });

        // Not Ready
        player.addListener('not_ready', ({ device_id }) => {
            console.log('Device ID has gone offline', device_id);

        });

        //error prevention 
        player.addListener('initialization_error', ({ message }) => {
            //console.error(message);
        });

        player.addListener('authentication_error', ({ message }) => {
            //console.error(message);
            refreshAccessToken();
            refreshDevices();
        });

        player.addListener('account_error', ({ message }) => {
            //console.error(message);
        });

        //auto update currently playing track information
        player.addListener('player_state_changed', (state) => {
            if (state != null) {
                position = state.position;
                currState = state.paused;
            }

            currentlyPlaying();

            //change button logo according to playing state
            if (state.paused) {
                // console.log("Paused!!")
                playToggle.playToggle = false;
            } else {
                // console.log("Playing!!")
                playToggle.playToggle = true;
            }
        });

        //connect new spotify instance
        player.connect();

        //listen for click on play-pause button 
        document.getElementById('togglePlay').onclick = function () {
            player.togglePlay();

        };

        //prev song
        document.getElementById('prev').onclick = function () {
            player.previousTrack().then(() => {
                //console.log('Set to previous track!');
                position = 0;
            });

        };

        //next song
        document.getElementById('next').onclick = function () {
            player.nextTrack().then(() => {
                //console.log('Skipped to next track!');
                position = 0;
            });

        };

        //player instance object
        // console.log(player);
    }
}



//needed
function handleRedirect() {
    let code = getCode();
    fetchAccessToken(code);
    window.history.pushState("", "", redirect_uri); // remove param from url
}
//needed
function getCode() {
    let code = null;
    const queryString = window.location.search;
    if (queryString.length > 0) {
        const urlParams = new URLSearchParams(queryString);
        code = urlParams.get('code')
    }
    return code;
}

function requestAuthorization() {
    let url = AUTHORIZE;
    url += "?client_id=" + client_id;
    url += "&response_type=code";
    url += "&redirect_uri=" + encodeURI(redirect_uri);
    url += "&show_dialog=true";
    url += "&scope=user-read-private user-read-email user-modify-playback-state user-read-playback-position user-library-read streaming user-read-playback-state user-read-recently-played playlist-read-private";
    window.location.href = url; // Show Spotify's authorization screen
}
//needed
function fetchAccessToken(code) {
    let body = "grant_type=authorization_code";
    body += "&code=" + code;
    body += "&redirect_uri=" + encodeURI(redirect_uri);
    body += "&client_id=" + client_id;
    body += "&client_secret=" + client_secret;
    callAuthorizationApi(body);
}
//needed
function refreshAccessToken() {
    refresh_token = localStorage.getItem("refresh_token");
    let body = "grant_type=refresh_token";
    body += "&refresh_token=" + refresh_token;
    body += "&client_id=" + client_id;
    callAuthorizationApi(body);
}
//needed
function callAuthorizationApi(body) {
    let xhr = new XMLHttpRequest();
    xhr.open("POST", TOKEN, true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.setRequestHeader('Authorization', 'Basic ' + btoa(client_id + ":" + client_secret));
    xhr.send(body);

    xhr.onload = handleAuthorizationResponse;
}
//needed
function handleAuthorizationResponse() {
    if (this.status == 200) {
        var data = JSON.parse(this.responseText);
        //console.log(data);
        var data = JSON.parse(this.responseText);
        if (data.access_token != undefined) {
            access_token = data.access_token;
            localStorage.setItem("access_token", access_token);
            //console.log(data.access_token);
        }
        if (data.refresh_token != undefined) {
            refresh_token = data.refresh_token;
            localStorage.setItem("refresh_token", refresh_token);
        }
        onPageLoad();
        location.reload();
    }
    else {
        //console.log(this.responseText);
        alert(this.responseText);
    }
}
//needed
function refreshDevices() {
    callApi("GET", DEVICES, null, handleDevicesResponse);
}
//needed
function handleDevicesResponse() {
    if (this.status == 200) {
        var data = JSON.parse(this.responseText);
        //console.log(data);
        removeAllItems("devices");
        data.devices.forEach(item => addDevice(item));
    }
    else if (this.status == 401) {
        refreshAccessToken()
    }
    else {
        //console.log(this.responseText);
        alert(this.responseText);
    }
}
//needed
function addDevice(item) {
    let node = document.createElement("option");
    node.value = item.id;
    node.innerHTML = item.name;
    document.getElementById("devices").appendChild(node);
}
//needed
function callApi(method, url, body, callback) {
    let xhr = new XMLHttpRequest();
    xhr.open(method, url, true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.setRequestHeader('Authorization', 'Bearer ' + access_token);
    xhr.send(body);
    xhr.onload = callback;
}
//needed
function refreshPlaylists() {
    callApi("GET", PLAYLISTS, null, handlePlaylistsResponse);
}
//needed
function handlePlaylistsResponse() {
    if (this.status == 200) {
        var data = JSON.parse(this.responseText);
        //console.log(data);
        removeAllItems("playlists");
        data.items.forEach(item => addPlaylist(item));
        document.getElementById('playlists').value = currentPlaylist;
    }
    else if (this.status == 401) {
        refreshAccessToken()
    }
    else {
        //console.log(this.responseText);
        alert(this.responseText);
    }
}
//needed
function addPlaylist(item) {
    let node = document.createElement("option");
    node.value = item.id;
    node.innerHTML = item.name + " (" + item.tracks.total + ")";
    document.getElementById("playlists").appendChild(node);
}
//needed
function removeAllItems(elementId) {
    let node = document.getElementById(elementId);
    while (node.firstChild) {
        node.removeChild(node.firstChild);
    }
}

function play() {
    let playlist_id = document.getElementById("playlists").value;
    let trackindex = document.getElementById("tracks").value;
    let body = {};

    body.context_uri = "spotify:playlist:" + playlist_id;

    body.offset = {};
    body.offset.position = trackindex.length > 0 ? Number(trackindex) : 0;
    body.offset.position_ms = 0;
    callApi("PUT", PLAY + "?device_id=" + deviceId(), JSON.stringify(body), handleApiResponse);
}

//needed
function handleApiResponse() {
    if (this.status == 200) {
        console.log(this.responseText);
        setTimeout(currentlyPlaying, 2000);
    }
    else if (this.status == 204) {
        setTimeout(currentlyPlaying, 2000);
    }
    else if (this.status == 401) {
        refreshAccessToken()
    }
    else {
        //console.log(this.responseText);
        alert(this.responseText);
    }
}

function deviceId() {
    return document.getElementById("devices").value;
}

function fetchTracks() {
    let playlist_id = document.getElementById("playlists").value;
    if (playlist_id.length > 0) {
        let url = TRACKS.replace("{{PlaylistId}}", playlist_id);
        callApi("GET", url, null, handleTracksResponse);
    }
}

function handleTracksResponse() {
    if (this.status == 200) {
        var data = JSON.parse(this.responseText);
        //console.log(data);
        removeAllItems("tracks");
        data.items.forEach((item, index) => addTrack(item, index));
    }
    else if (this.status == 401) {
        refreshAccessToken()
    }
    else {
        //console.log(this.responseText);
        alert(this.responseText);
    }
}

function addTrack(item, index) {
    let node = document.createElement("option");
    node.value = index;
    node.innerHTML = item.track.name + " (" + item.track.artists[0].name + ")";
    document.getElementById("tracks").appendChild(node);
}


//needed
function currentlyPlaying() {
    callApi("GET", PLAYER + "?market=US", null, handleCurrentlyPlayingResponse);
}

//needed
function handleCurrentlyPlayingResponse() {
    if (this.status == 200) {
        var data = JSON.parse(this.responseText);
        if (data.item != null) {
            document.getElementById("albumImage").src = data.item.album.images[0].url;
            document.getElementById("trackTitle").innerHTML = data.item.name;
            document.getElementById("trackArtist").innerHTML = data.item.artists[0].name;
            track_id = data.item.id;
            let progress = data.progress_ms // HERE IS THE CONSOLE!
            localStorage.setItem("progress", progress)
            // console.log(progress)
            duration = data.item.duration_ms

            if (localStorage.getItem('trackid') != track_id) {
                localStorage.setItem('trackid', track_id)
                url = ANALYSIS.replace("{id}", track_id);
                callApi("GET", url, null, handleAnalysisResponse);
            }
        }


        if (data.device != null) {
            // select device
            currentDevice = data.device.id;
            document.getElementById('devices').value = currentDevice;
        }

        if (data.context != null) {
            // select playlist
            currentPlaylist = data.context.uri;
            currentPlaylist = currentPlaylist.substring(currentPlaylist.lastIndexOf(":") + 1, currentPlaylist.length);
            document.getElementById('playlists').value = currentPlaylist;
        }
    }
    else if (this.status == 204) {

    }
    else if (this.status == 401) {
        refreshAccessToken()
    }
    else {
        //console.log(this.responseText);
        alert(this.responseText);
    }
}

function handleAnalysisResponse() {
    if (this.status == 200) {
        var data = JSON.parse(this.responseText);
        //console.log(data)
        localStorage.setItem('analysis', JSON.stringify(data))
    }
    else if (this.status == 401) {
        refreshAccessToken()
    }
    else {
        console.log(this.responseText);
        alert(this.responseText);
    }
}