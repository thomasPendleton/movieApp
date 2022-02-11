const apiKey = '&api_key=9b9bd731718f026be642a5ee946b2c5c'
const popular =
  'https://api.themoviedb.org/3/discover/movie?api_key=9b9bd731718f026be642a5ee946b2c5c&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1'
const API_URL = 'https://api.themoviedb.org/3/search/movie?'
const IMG_PATH = 'https://image.tmdb.org/t/p/w1280'
const page = 1
const request = `${API_URL}${apiKey}&query="`

const form = document.getElementById('form')
const search = document.getElementById('search')
const main = document.getElementById('main')

// Async function
async function getMovies(url) {
  const response = await fetch(url)
  const data = await response.json()
  showMovies(data.results)
  // const movies = data.results
  // movies.forEach(movie => console.log(movie.original_title))
}
getMovies(popular)

form.addEventListener('submit', (e) => {
  e.preventDefault()

  const searchTerm = search.value

  if (searchTerm && searchTerm !== '') {
    getMovies(request + searchTerm)
    search.value = ''
  } else {
    window.location.reload()
  }
})

function getClassByRate(vote) {
  if (vote > 8) {
    return 'green'
  } else if (vote > 5) {
    return 'orange'
  } else {
    return 'red'
  }
}

function showMovies(data) {
  main.innerHTML = ''
  data.forEach((movie) => {
    const { title, poster_path, vote_average, overview } = movie
    let posterLink = IMG_PATH + poster_path
    const rateColor = getClassByRate(vote_average)
    const movieEl = document.createElement('div')
    movieEl.classList.add('movie')
    if(!poster_path){
        posterLink = 'https://images.unsplash.com/photo-1560109947-543149eceb16?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1335&q=80'
    }
    movieEl.innerHTML = `
        
        <img
          src="${posterLink}"
          alt="${title}"
        />
        <div class="movie-info">
          <h3>${title}</h3>
          <span class="${rateColor}">${vote_average}</span>
        </div>
        <div class="overview">
          <h3>Overview</h3>
          ${overview}
        </div>
        `

    main.appendChild(movieEl)
  })
}

//Promise function
// function getMovies2(){
//     const response = fetch(request + 'batman')
//     .then(response => response.json())
//     .then(data => console.log(data.results))
// }
// getMovies2()
