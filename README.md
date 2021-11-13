<div id="top"></div>

<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/github_username/repo_name">
    <img src="assets/favicon.png" alt="Logo" width="80" height="80">
  </a>

<h3 align="center">Audiophiles</h3>

  <p align="center">
    <i>IS216 Web Application Development 2 Project for Singapore Management University</i>
    <br />
    Audiophiles is a digital audio streaming and media provider, which gives users an immersive 3D audio and visual experience with all genres of music. It inherently allows users to upload and listen to music that they have created as well as from their own Spotify Playlists. 
    <br />
    The team would like users to relive the days of owning their own Hi-fi system where you could watch the movement of the music’s soundwaves, but in a manner where it's interactive and curated to their own music playlist.
    <br />
    <a href="https://github.com/Vasn/wad-g8"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://vasn.github.io/wad-g8/">View Demo</a>
    ·
    <a href="https://github.com/Vasn/wad-g8/issues">Report Bug</a>
    ·
    <a href="https://github.com/Vasn/wad-g8/issues">Request Feature</a>
  </p>
</div>



<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project

[![Product Name Screen Shot][product-screenshot]](https://vasn.github.io/wad-g8/)

<p align="right">(<a href="#top">back to top</a>)</p>



### Built With

* [Bootstrap](https://getbootstrap.com/)
* [Three.js](https://threejs.org/)
* [Vue.js](https://vuejs.org/)
* [Firebase](https://firebase.google.com/)
* [Spotify Web API](https://developer.spotify.com/documentation/web-api/)
* [Spotify Web Playback SDK](https://developer.spotify.com/documentation/web-playback-sdk/)
* [Web Audio API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API)
* [Heroku](https://www.heroku.com/)

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- GETTING STARTED -->
## Getting Started

To get a local copy up and running follow these simple example steps.

### Prerequisites

* Spotify Premium Account
* Spotify Developer Account
* Firebase Google Account

### Installation

1. Create a new client application at [Spotify Developer Dashboard](https://developer.spotify.com/dashboard/login)
1. Get your client ID and client secret within our application dashboard.
2. Clone the repo
   ```sh
   git clone https://github.com/Vasn/wad-g8.git
   ```
<!-- ONLY DONE UP TILL HERE!!!!!!!!!!!!!!!!!!!! -->
3. Enter your client id..... Client secret... in here in there...
   ```sh
   CLIENT_ID = "abcd"
   ```
4. Enter your API in `config.js`
   ```js
   const API_KEY = 'ENTER YOUR API';
   ```

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- USAGE EXAMPLES -->
## Usage

Use this space to show useful examples of how a project can be used. Additional screenshots, code examples and demos work well in this space. You may also link to more resources.

_For more examples, please refer to the [Documentation](https://example.com)_

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- ROADMAP -->
## Roadmap

- [] Feature 1
- [] Feature 2
- [] Feature 3
    - [] Nested Feature

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- CONTACT -->
## Contact

Your Name - [@twitter_handle](https://twitter.com/twitter_handle) - email@email_client.com

Project Link: [https://github.com/Vasn/wad-g8](https://github.com/Vasn/wad-g8)

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- ACKNOWLEDGMENTS -->
## Acknowledgments

* []()
* []()
* []()

<p align="right">(<a href="#top">back to top</a>)</p>


[product-screenshot]: assets/indexscreenshot.png


SHYA's Readme

README (♡˙︶˙♡)
FOR CHANGES IN THE SPOTIFY-FILES ONLY! + now  ALSO includes changes to other pages!

13 NOV 2021 
many things have changed since the 9th but the latest working update

SPOTIFY
- now has MORE modals because i am excessive that way: this also is to alert users to have one running instance of spotify or to change their spotify device to play on the web application 
- shifted music controls down next to the little scene changing circles, changed col-lg-4 to col
- EDITED THE CODE so it's cleaNER: VAS IF U R READING THIS I HAVE SHOVED MY MODALS INTO UR APP DIV

NAVBAR CHANGES
- vue navbar now works on spotify, updated navbar.js to keep up w the updates
- made the credits more subtle.


9 NOV 2021
- deleted main.css and util.css because there were many many many many many lines of useless code
- created test.css (probably should change the name for this but for now it works) it's what the main pages use (spotify - index.html and uploads - login.html)

4 NOV 2021
there were many pushes prior to this one but uhhh ignore those ...
- ACTUALLY fixed track analysis using local storage
    it now only returns a SINGLE console.log instance (i'm assuming it's the first instance because if it were to be the last, the delay would have been longer)
- linked upload.html from the navbar dropdown

23-24 OCT 2021
- fixed track analysis
- fixed dropdown menu
- redesigned modal (decided that it is OK to not make it slide out from right)

19 OCT 2021
- made the buttons cute, used Vue

16 OCT 2021
- since this is the first read me, just note that future read mes will be added above and not below!
- clientid/secret is currently shya's (this will change in the future!),
if you face an error in redirect uri, it is most likely that it's not whitelisted on shya's spotify web api app end
so use your own clientid/secret and whitelist it OR let me know and i will whitelist your redirect uri!
- added the base files, but important files to note are the index.html and app.js which will be where most of the changes occur

PROBLEMS TO FIX / FEATURES TO ADD ヾ(`ヘ´)ﾉﾞ	

- [X] Device not automatically obtained upon page load, requires a page reload for it to appear
- [X] Mobile responsiveness (to-check)
- [X] Fix Spotify Web SDK not working
- [] Store client ID/secret in database
- [x] Scene for music
- [x] Fix for when Spotify is used on another device, there's an error where name/pause data cannot be read
- [] Sessions
