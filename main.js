let searchResults = document.querySelector(".search_results")
searchResults.addEventListener("click", playSnippet)
let button = document.querySelector(".button");
button.addEventListener("click", doSearch)

let audio = document.getElementById("audio")
let nowPlaying = document.querySelector(".now-playing")


function playSnippet(event) {
    if (event.target.classList.contains("play-button")) {
        console.log(`target: ${event.target}`)
        audio.src = event.target.nextElementSibling.innerText
        audio.play()
        nowPlaying.innerText = "Now Playing: " + event.target.nextSibling.nextElementSibling.innerText
    }
}

function doSearch(e) {

    console.log("doSearch")
    let searchInputElement = document.getElementById("search-input")
    let searchTerm = searchInputElement.value.toLowerCase()
    let searchResult = searchTerm.split(" ").join("+")
    console.log(searchResult)

    if (searchTerm) {
        e.preventDefault()
    }

    let itunesUrl = "https://itunes.apple.com/search?media=music&attribute=artistTerm&limit=100&term=" + searchResult
    console.log(itunesUrl)

    fetch(itunesUrl, {
        method: "GET",
        headers: { 'Content-Type': 'application/json' },
    })
        .then(function (response) {
            if (response.ok)
                return response.json();
            else throw new Error("Status code error :" + response.status)
        })
        .then(function (data) {
            console.log(data)
            if (data.resultCount === 0) {
                noSearchResults()
            } else {
                buildItunes(data)
            }
        })
        .catch((error) => {
            console.log(error)
        })
}


function noSearchResults() {
    searchResults.innerHTML = ""
    let noResults = document.createElement("h3")
    let img = document.createElement("img")
    img.classList.add("caulkin-image")
    img.src = "images/ha_culkin.webp"
    noResults.classList.add("no-results")
    noResults.innerText = "Sorry, your search did not return any results!"
    noResults.appendChild(img)
    searchResults.appendChild(noResults)
}


function buildItunes(data) {
    // clears previous results
    searchResults.innerHTML = "";
    // goes back to the top of the search results if new search performed
    searchResults.scrollTop = 0;


    for (let trackInfo of data.results) {

        let songCard = document.createElement("div")
        songCard.classList.add("song_card")

        // Album cover
        let albumCover = document.createElement("img")
        albumCover.classList.add("album_cover")
        albumCover.setAttribute("src", `${trackInfo.artworkUrl100}`)
        songCard.appendChild(albumCover)

        // Plau button
        let playButton = document.createElement("button")
        playButton.classList.add("play-button")
        playButton.innerText = "Listen to a Preview"
        songCard.appendChild(playButton)

        // Audio
        let audioSource = document.createElement("div")
        audioSource.classList.add("audio-source")
        audioSource.innerText = trackInfo.previewUrl
        songCard.appendChild(audioSource)

        // Song title
        let songTitle = document.createElement("p")
        songTitle.classList.add("song-title")
        songTitle.innerText = `${trackInfo.trackName}`
        songCard.appendChild(songTitle)


        // Album title
        let albumTitle = document.createElement("p")
        albumTitle.classList.add("album-title")
        albumTitle.innerText = "Album Title: " + `${trackInfo.collectionName}`
        songCard.appendChild(albumTitle)

        // Band/Artist
        let artistName = document.createElement("p")
        artistName.classList.add("artist-name")
        artistName.innerText = ("Artist Name: ") + `${trackInfo.artistName}`
        songCard.appendChild(artistName)

        searchResults.appendChild(songCard)
    }
}
