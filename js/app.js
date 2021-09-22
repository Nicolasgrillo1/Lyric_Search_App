//APP config

const API  = "https://api.lyrics.ovh";

//Grabamos los elementos del D.O.M 
const search = document.querySelector(".search")
const form = document.querySelector(".form")
const content = document.querySelector(".content")

//Escuchamos el submit

form.addEventListener("submit", event => {
    event.preventDefault()

    const searchTerm = search.value.trim()

    if(!searchTerm){
        alert("You must type a valid search term")
        return
    }

    searchSong(searchTerm)

})

//Funcion para buscar la cancion

async function searchSong(search) {
    const request = await fetch(`${API}/suggest/${search}`)
    const response = await request.json()
    const songs = response.data

    showSongs(songs)
}

//Mostramos las canciones del fetch

function showSongs(songs){
    content.innerHTML= `
    <ul class="songs">
        ${songs.map(song => {
            return `

            <li class="song"> 
                <img class="avatar" src="${song.album.cover}">
                <span class="name">${song.title}</span>
                <button data-title="${song.title}" data-artist="${song.artist.name}" class="show"> Show Lyric</button>
                <a class="dezzer" target="_blank" href="${song.link}"><img src="/Lyric_Search_App/assets/img/1486348532-music-play-pause-control-go-arrow_80458.ico"></a>
                </li>`
        }).join("")}
    </ul>
    `
}

// Escuchamos el boton de Show Lyrics

content.addEventListener("click",event => {
    if(event.target.tagName === "BUTTON") {
        const element = event.target
        const artist = element.getAttribute("data-artist")
        const title = element.getAttribute("data-title")
        
        getSong(artist, title)

    }
})

// buscar la letra de la cancion

async function getSong(artist, title) {
    const request = await fetch(`${API}/v1/${artist}/${title}`)
    const response = await request.json()
    const lyric = response.lyrics

    showSong(title, artist, lyric)

}

//llamar la letra de la cancion 

function showSong(title, artist, lyric) {
    lyric = lyric.replace(/(\n\r|\n|\r)/g, "<br>")
    content.innerHTML = `
    <h1 class="title">${title}</h1>
    <h3 class="artist">${artist}</h3>
    <p class="lyric">
        ${lyric}    
    </p>

    `
}

