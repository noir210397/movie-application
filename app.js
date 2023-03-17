let apiUrl = "http://www.omdbapi.com/?s=I spit&page=1&apikey=d80c333c"
let searchBar = document.querySelector('#search-bar')
let list = document.querySelector("ul")
let moviePage = document.querySelector(".movie-display")
searchBar.addEventListener("keyup", () => {
    if (searchBar.value.trim() !== "" && searchBar.value.trim().length > 3) {
        getMovies(searchBar.value.trim())

    }
    else {
        list.innerHTML = ""
        return

    }
})
async function getMovies(v) {
    try {
        const searchedMovies = await fetch(`http://www.omdbapi.com/?s=${v}&page=1&apikey=d80c333c`)
        const data = await searchedMovies.json()
        if (data.Search !== undefined) {
            west = await data.Search.map((item) => {
                const { Title, Poster, Year } = item
                return `
        <li id="${Title}">
        <div class="img">
          <img
            src="${Poster}"
            alt="-poster"
          />
        </div>
        <div class="text-part">
          <p>${Title}</p>
          <p>${Year}</p>
        </div>
      </li>`
            })
            list.innerHTML = west.join()
            let arrListen = [...document.querySelectorAll("li")]
            arrListen.forEach(item => {
                item.addEventListener("click", () => {
                    getMainMoviePage(item.id)
                })
            })
        }
        else { return }
    }
    catch (err) {
        console.log(err)
    }

}
// getMovies("spiderman")

async function getMainMoviePage(x) {
    try {
        const movie = await fetch(`http://www.omdbapi.com/?t=${x}&apikey=d80c333c`)
        const data = await movie.json()
        const dataToUse = [data]
        const y = dataToUse.map(item => {
            const { Title, Genre, Year, Plot, Poster, Language, Awards, Ratings, Released, Writer, Actors } = item
            return `<div class="image">
        <img
          src="${Poster}"
          alt=""
        />
      </div>
      <div class="display-text">
        <div class="description">
          <p class="movie-name">${Title}</p>
          <p>Year:${Year} <span></span> Released:${Released}</p>
          <p>Genre:${Genre}</p>
          <p>Writer:${Writer}</p>
          <p>Actors:${Actors}</p>
          <p>
            Plot:${Plot}
          </p>
          <p>Language:${Language}</p>
          <p>Awards:${Awards}</p>
        </div>
      </div>`
        })
        moviePage.innerHTML = y.join()
        list.innerHTML = ""
        searchBar.value = ""
    }
    catch (err) {
        console.log(err)
    }
    // console.log(y)
    // window.location("./index.html")
}
