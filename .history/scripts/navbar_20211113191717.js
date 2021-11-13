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
                    <li class="nav-item">🤡
                        <a class="nav-link" :href=links.creditsLink><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-suit-heart" viewBox="0 0 16 16">
  <path d="m8 6.236-.894-1.789c-.222-.443-.607-1.08-1.152-1.595C5.418 2.345 4.776 2 4 2 2.324 2 1 3.326 1 4.92c0 1.211.554 2.066 1.868 3.37.337.334.721.695 1.146 1.093C5.122 10.423 6.5 11.717 8 13.447c1.5-1.73 2.878-3.024 3.986-4.064.425-.398.81-.76 1.146-1.093C14.446 6.986 15 6.131 15 4.92 15 3.326 13.676 2 12 2c-.777 0-1.418.345-1.954.852-.545.515-.93 1.152-1.152 1.595L8 6.236zm.392 8.292a.513.513 0 0 1-.784 0c-1.601-1.902-3.05-3.262-4.243-4.381C1.3 8.208 0 6.989 0 4.92 0 2.755 1.79 1 4 1c1.6 0 2.719 1.05 3.404 2.008.26.365.458.716.596.992a7.55 7.55 0 0 1 .596-.992C9.281 2.049 10.4 1 12 1c2.21 0 4 1.755 4 3.92 0 2.069-1.3 3.288-3.365 5.227-1.193 1.12-2.642 2.48-4.243 4.38z"/>
</svg></a>
                    </li>
                </ul>
            </div>
        </div>
    </nav>`,
})
app.mount("#compApp")