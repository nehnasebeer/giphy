console.log("script.js connected!");

const API_KEY = "tsk45zMwkPnQWk46v9lO9GXXgTNnBEF6";


const gifContainer = document.querySelector("#gif-container");
const fetchButton = document.querySelector("#fetch-gif-btn");
const searchInput = document.querySelector("#search-input");

async function fetchGifs(query) {
  const limit = 12; // how many gifs you want back

  const endpoint = `https://api.giphy.com/v1/gifs/search?api_key=${API_KEY}&q=${encodeURIComponent(
    query
  )}&limit=${limit}&rating=g&lang=en`;

  const response = await fetch(endpoint);
  const data = await response.json();

  const images = data.data.map((gif) => gif.images.original.url);

  console.log("Fetched images:", images);
  return images;
}

function renderGifs(images, term) {
  // Clear out old gifs
  gifContainer.innerHTML = "";

  if (images.length === 0) {
    gifContainer.innerHTML =
      '<p class="text-muted">No GIFs found. Try another search.</p>';
    return;
  }

  images.forEach((url) => {
    gifContainer.innerHTML += `
      <img 
        src="${url}" 
        alt="${term} gif" 
        class="col-3 mb-3 img-fluid"
      >
    `;
  });
}

fetchButton.addEventListener("click", async () => {
  try {
    let term = "cats";
    if (searchInput && searchInput.value.trim() !== "") {
      term = searchInput.value.trim();
    }

    console.log("Searching Giphy for:", term);

    const images = await fetchGifs(term);
    renderGifs(images, term);
  } catch (error) {
    console.error("Error fetching gifs:", error);
    gifContainer.innerHTML =
      '<p class="text-danger">Something went wrong. Please try again.</p>';
  }
});
