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
            // shya: spotify navbar requires the modal to be there so i'm yeeting that code away
            if (window.location.href.includes("uploads/")) {
                return {
                    homeLink: "",
                    spotifyLink: "./spotify-files/",
                    uploadLink: ""
                }
                //href links if at base page
            } else {
                return {
                    homeLink: "",
                    spotifyLink: "./spotify-files",
                    uploadLink: "./uploads/login.html"
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