const apiKey = '8aed36c8'

async function loadWatchList() {
  const mySavedMovies = JSON.parse(localStorage.getItem('watchlist')) || [];
  console.log("Saved Movies from Storage:", mySavedMovies);
  const watchlistContainer = document.getElementById('watchlist-container');

  if (!watchlistContainer) return;
  if (mySavedMovies.length === 0) {
    watchlistContainer.innerHTML = `
        <p class="unable">Your watchlist is looking a little empty...</p>
        <button onclick="goToSearch()" class="add-movie"><i class="fa-solid fa-circle-plus plus"></i>Let add some movies!</button>
    `;
    return
  }


  let html = '';
  for (let movie of mySavedMovies) {
    const id = typeof movie === 'string' ? movie : movie.imdbID;
    const res = await fetch(`https://www.omdbapi.com/?i=${id}&apikey=${apiKey}`);
    const details = await res.json();
    html += `
            <div class='movie-card'>
              <img src=${details.Poster} alt="poster">
              <div class="info">
              <h3>${details.Title} <span class="rate-star">⭐ ${details.imdbRating}</span></h3>
              <p id="time-genre">${details.Runtime} | ${details.Genre}
              <button id="remove-watchlist" onclick="removeFromWatchlist('${id}')"><i class="fa-solid fa-circle-minus minus"></i>Remove</button>
              </p>
              <p id="details-plot">${details.Plot}</p>
              </div>
            </div>            
            `

  }
  watchlistContainer.innerHTML = html
}
loadWatchList()

function removeFromWatchlist(id) {
  let watchlist = JSON.parse(localStorage.getItem('watchlist')) || [];
  watchlist = watchlist.filter(movieId => movieId !== id);
  localStorage.setItem('watchlist', JSON.stringify(watchlist));
  loadWatchList();
}
function goToSearch() {
  window.location.href = "index.html";
}

