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
            // href links at upload directory
            if (window.location.href.includes("upload.html") || window.location.href.includes("login.html")) {
                return {
                    homeLink: "./index.html",
                    spotifyLink: "./spotify.html",
                    uploadLink: "",
                    creditsLink: "./credits.html"
                }
                // href links at spotify page
            } else if (window.location.href.includes("spotify.html")) {
                return {
                    homeLink: "./index.html",
                    spotifyLink: "",
                    uploadLink: "./login.html",
                    creditsLink: "./credits.html"
                }
            }
            else {
                return {
                    homeLink: "",
                    spotifyLink: "./spotify.html",
                    uploadLink: "./login.html",
                    creditsLink: "./credits.html"
                }
            }
        }
    },
    template: `<nav class="navbar navbar-expand-md navbar-dark fixed-top" style='background-color:black;'>
        <div class="container-fluid">
            <a class="navbar-brand" href="./index.html">Audiophile</a>
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
                        <a class="nav-link" :href=links.spotifyLink>Spotify</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" :href=links.uploadLink>Upload</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" :href=links.creditsLink>Credits</a>
                    </li>
                </ul>
            </div>
        </div>
    </nav>`,
})
app.mount("#compApp")