fetchData();

document.querySelector(`.search`).addEventListener(`keypress`, function (e) {
  if (e.key == `Enter`) {
    const index = e.target.value.trim();
    if (index) {
      fetchSearch(index);
    } else {
      fetchData();
    }
  }
});
async function fetchData() {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=3fd2be6f0c70a2a598f084ddfb75487c&page=1&#39`
    );
    if (!response.ok) {
      throw new Error(`Could not fetch resource`);
    }
    const data = await response.json();
    displayMovies(data.results);
  } catch (error) {
    console.error(error);
  }
}

async function fetchSearch(index) {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=3fd2be6f0c70a2a598f084ddfb75487c&query=${encodeURIComponent(
        index
      )}`
    );
    if (!response.ok) {
      throw new Error(`Could not fetch resource`);
    }
    const data = await response.json();
    displayMovies(data.results);
  } catch (error) {
    console.error(error);
  }
}
function displayMovies(film) {
  const container = document.getElementById(`moviesContainer`);
  container.innerHTML = "";

  for (let i = 0; i < film.length; i++) {
    const content = document.createElement(`div`);
    content.classList.add(`content`);

    const image = document.createElement(`img`);
    image.src = `https://image.tmdb.org/t/p/w1280` + film[i].poster_path;
    image.classList.add(`poster`);
    content.appendChild(image);

    const overView = document.createElement(`p`);
    const str = document.createElement(`strong`);
    str.textContent = "overview";
    overView.classList.add("overView");
    overView.appendChild(str);
    const line = document.createElement(`br`);
    overView.appendChild(line);
    const lineTwo = document.createElement(`br`);
    overView.appendChild(lineTwo);

    overView.append(film[i].overview);
    content.appendChild(overView);

    const bottomPart = document.createElement(`div`);
    bottomPart.classList.add(`bottomPart`);
    content.appendChild(bottomPart);

    const title = document.createElement(`p`);
    title.textContent = film[i].title;
    title.classList.add("title");
    bottomPart.appendChild(title);

    const rate = document.createElement(`span`);
    rate.textContent = film[i].vote_average;
    rate.classList.add(`rate`);
    bottomPart.appendChild(rate);

    container.appendChild(content);
  }
}
