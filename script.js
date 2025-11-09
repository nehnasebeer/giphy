console.log("script.js connected!");

// 1. Your Giphy API key
// Replace YOUR_API_KEY_HERE with the key you got from Giphy
const API_KEY = "YOUR_API_KEY_HERE";

// 2. DOM elements
const gifContainer = document.querySelector("#gif-container");
const fetchButton = document.querySelector("#fetch-gif-btn");
const searchInput = document.querySelector("#search-input");

// 3. Function to call Giphy API and return an array of image URLs
async function fetchGifs(query) {
  const limit = 12; // how many gifs you want back

  const endpoint = `https://api.giphy.com/v1/gifs/search?api_key=${API_KEY}&q=${encodeURIComponent(
    query
  )}&limit=${limit}&rating=g&lang=en`;

  const response = await fetch(endpoint);
  const data = await response.json();

  // data.data is an array of gif objects
  const images = data.data.map((gif) => gif.images.original.url);

  console.log("Fetched images:", images);
  return images;
}

// 4. Function to render gifs into the DOM
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

// 5. Event listener for the button
fetchButton.addEventListener("click", async () => {
  try {
    // Use the search term if provided, otherwise a default term
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
