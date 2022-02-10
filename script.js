const apiKey = '&api_key=9b9bd731718f026be642a5ee946b2c5c'
const API_URL = 'https://api.themoviedb.org/3/search/movie?'
const IMG_PATH = 'https://image.tmdb/org/t/p/w1280'
const page = 1
const request = `${API_URL}${apiKey}&query="`


const form = document.getElementById('form')
const search = document.getElementById('search')

// Async function 
async function getMovies(url){
    const response = await fetch(url);
    const data = await response.json()
    
    const movies = data.results
    movies.forEach(movie => console.log(movie.original_title))
}
getMovies(request)

form.addEventListener('submit', (e) => {
    e.preventDefault()

    const searchTerm = search.value
    search.value = ''
    getMovies(request + searchTerm)
})























//Promise function
// function getMovies2(){
//     const response = fetch(request + 'batman')
//     .then(response => response.json())
//     .then(data => console.log(data.results))
// }
// getMovies2()