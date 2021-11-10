const app = Vue.createApp({

})

//navbar vue component
app.component('navbar', {
    data() {
        return {
            appName: 'Audiophile'
        }
    },
    computed: {
        links() {
            //href links if at spotify page
            if (window.location.href.includes("spotify-files/index.html")) {
                return {
                    homeLink: "../wad-g8/index.html",
                    spotifyLink: "../wad-g8/spotify-files/index.html",
                    uploadLink: "../wad-g8/uploads/login.html"
                }
                //href links if at home page
            } else if (window.location.href.includes("wad-g8/index.html")) {
                return {
                    homeLink: "",
                    spotifyLink: "../wad-g8/spotify-files/index.html",
                    uploadLink: "../wad-g8/uploads/login.html"
                }
                //href links if at upload page
            } else {
                return {
                    homeLink: "../index.html",
                    spotifyLink: "../spotify-files/index.html",
                    uploadLink: ""
                }
            }
        }
    },
    template: `<nav class="navbar navbar-light bg-transparent px-3">
            <div class="container-fluid" style="padding:0 15px 0 15px;">
                <span class="navbar-brand mb-0 h1 text-light">{{appName}}
                    <div class="btn-group">
                        <button type="button" class="text-light btn dropdown-toggle" data-bs-toggle="dropdown">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                class="bi bi-list" viewBox="0 0 16 16">
                                <path fill-rule="evenodd"
                                    d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z" />
                            </svg></button>
                        <div class="dropdown-menu dropdown-menu-left">
                            <a :href=links.homeLink class="dropdown-item">Home</a>
                            <a :href=links.spotifyLink class="dropdown-item">Spotify</a>
                            <a :href=links.uploadLink class="dropdown-item">Upload</a> 
                        </div>
                    </div>
                </span>
            </div>
        </nav>`,
})
app.mount("#compApp")