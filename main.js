let searchResults = document.querySelector(".search_results")
searchResults.addEventListener("click", playSnippet)

function playSnippet(event) {
    console.log(event.target)
}

let button = document.querySelector(".button");
button.addEventListener("click", function(e) {
    let searchInputElement = document.getElementById("search-input")
    let searchTerm = searchInputElement.value.toLowerCase()
    let searchResult = searchTerm.split(" ").join("+")
    e.preventDefault()
    console.log(searchResult)

let itunesUrl = "https://itunes.apple.com/search?media=music&attribute=artistTerm&term=" + searchResult
console.log(itunesUrl)

fetch (itunesUrl, {
    method: "GET",
    headers: {'Content-Type': 'application/json'},
})
    .then(function (response) {
        return response.json()
    })
    .then(function (data) {
        delete(searchResults)
        console.log(data)
        buildItunes(data)
    })

     function buildItunes(data) {

        // clears previous results
        searchResults.innerHTML = "";

        for (let trackInfo of data.results) {

        let songCard = document.createElement("div")
        songCard.classList.add("song_card")

        let albumCover = document.createElement("img")
        albumCover.classList.add("album_cover")
        albumCover.setAttribute("src", `${trackInfo.artworkUrl100}`)
        songCard.appendChild(albumCover)
        
        
        let iconLinkP = document.createElement("p")
        
        let icon = document.createElement("i")
        icon.classList.add("fa-solid")
        icon.classList.add("fa-play")
        iconLinkP.appendChild(icon)

        let songTitle = document.createElement("p")
        songTitle.innerText = ("Song Title: ") + `${trackInfo.trackName}`
        iconLinkP.appendChild(songTitle)
        songCard.appendChild(iconLinkP)
        
        let albumTitle = document.createElement("p")
        albumTitle.innerText = "Album Title: " + `${trackInfo.collectionName}`
        songCard.appendChild(albumTitle)
        
        let artistName = document.createElement("p")
        artistName.innerText = ("Artist Name: ") + `${trackInfo.artistName}`
        songCard.appendChild(artistName)

        searchResults.appendChild(songCard)

     }
    }
})
     