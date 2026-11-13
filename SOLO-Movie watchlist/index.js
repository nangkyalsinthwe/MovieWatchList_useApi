const searchInput = document.getElementById('search-input')
const searchBtn = document.getElementById('search-btn')
const movieResults = document.getElementById('movie-results')
const apiKey = '8aed36c8'

window.onload = () => {
  document.getElementById('search-input').focus();
};

searchBtn.addEventListener('click', async () => {
  movieResults.innerHTML = `
        <div class="loading-container">
            <i class="fa-solid fa-film film-icon"></i>
            <p>Start exploring...</p>
        </div>
    `;

  const res = await fetch(`https://www.omdbapi.com/?s=${searchInput.value}&apikey=${apiKey}`)
  const data = await res.json()
  console.log(data)

  setTimeout(() => {
    if (data.Search) {
      renderMovies(data.Search);

    } else {
      movieResults.innerHTML = "<p class='unable'>Unable to find what you're looking for. Please try another search.</p>";
    }
  }, 1000);

})


async function renderMovies(movies) {
  let html = ''
  for (let movie of movies) {
    const res = await fetch(`https://www.omdbapi.com/?i=${movie.imdbID}&apikey=${apiKey}`)
    const details = await res.json()
    html += `
            <div class='movie-card'>
              <img src=${details.Poster} alt="poster">
              <div class="info">
              <h3>${details.Title} ${details.Year}  <span class="rate-star">⭐ ${details.imdbRating}</span></h3>
              <p id="time-genre">${details.Runtime} | ${details.Genre}
              <button id="add-watchlist" onclick="addToWatchlist('${details.imdbID}')"><i class="fa-solid fa-circle-plus plus"></i> Watchlist</button>
              </p>
              <p id='details-plot'>${details.Plot}</p>
              </div>
            </div>            
            `
  }
  movieResults.innerHTML = html
}


function addToWatchlist(id) {
  let watchlist = JSON.parse(localStorage.getItem('watchlist')) || [];
  if (!watchlist.includes(id)) {
    watchlist.push(id);
    localStorage.setItem('watchlist', JSON.stringify(watchlist));
  }
}















