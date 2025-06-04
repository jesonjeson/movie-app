const searchBtn = document.getElementById("searchBtn");
const searchInput = document.getElementById("searchInput");
const movieResults = document.getElementById("movieResults");

const API_KEY = "71cd360e"; // Replace with your real key

// Default popular movies to load at start
const popularMovies = [
  "Avengers",
  "Batman",
  "Inception",
  "Titanic",
  "Interstellar",
  "Joker",
  "Frozen",
  "G"
];

// Load popular movies on page load
window.addEventListener("DOMContentLoaded", () => {
  popularMovies.forEach(title => {
    fetchMovie(title);
  });
});

searchBtn.addEventListener("click", async () => {
  const query = searchInput.value.trim();

  if (!query) {
    alert("Please enter a movie name.");
    return;
  }

  const url = `https://www.omdbapi.com/?apikey=${API_KEY}&s=${query}`;

  try {
    const res = await fetch(url);
    const data = await res.json();

    if (data.Response === "True") {
      displayMovies(data.Search);
    } else {
      movieResults.innerHTML = `<p>No results found.</p>`;
    }
  } catch (error) {
    movieResults.innerHTML = `<p>Error fetching movie data.</p>`;
  }
});

function displayMovies(movies) {
  movieResults.innerHTML = "";

  movies.forEach((movie) => {
    const card = document.createElement("div");
    card.classList.add("card");

    card.innerHTML = `
      <img src="${movie.Poster !== "N/A" ? movie.Poster : "https://via.placeholder.com/200x300"}" alt="${movie.Title}">
      <h3>${movie.Title}</h3>
      <p>${movie.Year}</p>
      <p>${movie.rating}</p>
    `;

    movieResults.appendChild(card);
  });
}

// Fetch one popular movie at a time and add to display
async function fetchMovie(title) {
  const url = `https://www.omdbapi.com/?apikey=${API_KEY}&s=${title}`;
  try {
    const res = await fetch(url);
    const data = await res.json();
    if (data.Response === "True") {
      displayMoreMovies(data.Search); // Do not clear, just add
    }
  } catch (err) {
    console.log("Error loading popular movie:", title);
  }
}

// Appends more movies to the display
function displayMoreMovies(movies) {
  movies.forEach((movie) => {
    const card = document.createElement("div");
    card.classList.add("card");

    card.innerHTML = `
      <img src="${movie.Poster !== "N/A" ? movie.Poster : "https://via.placeholder.com/200x300"}" alt="${movie.Title}">
      <a href="https://vegamovies.cr/26400-hridayam-2022-hindi-hq-dub-movie-hdrip-720p-480p.html">watch online</a>
      <h3>${movie.Title}</h3>
      <p>${movie.Year}</p>
      <p>${movie.rating}</p>
    `;

    movieResults.appendChild(card);
  });
}
