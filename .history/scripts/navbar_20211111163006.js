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
            if (window.location.href.includes("uploads/")) {
                return {
                    homeLink: "../",
                    spotifyLink: "../spotify.html",
                    uploadLink: ""
                }
                //href links if at base page
            } else {
                return {
                    homeLink: "",
                    spotifyLink: "spotify.html",
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
        </nav>
        <nav class="navbar navbar-expand-md navbar-dark fixed-top" style='background-color:black;'>
        <div class="container-fluid">
            <a class="navbar-brand" href="#">Audiophile</a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarColor01"
                aria-controls="navbarColor01" aria-expanded="true" aria-label="Toggle navigation">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                    class="text-light bi bi-list" viewBox="0 0 16 16">
                    <path fill-rule="evenodd"
                        d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z" />
                </svg>
            </button>
            <div class="navbar-collapse collapse" id="navbarColor01">
                <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                    <li class="nav-item">
                        <a class="nav-link" :href=links.homeLink>Home</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link active" aria-current="page" :href=links.spotifyLink>Spotify</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" :href=links.uploadLink>Upload</a>
                    </li>
                </ul>
            </div>
        </div>
    </nav>`,
})
app.mount("#compApp")