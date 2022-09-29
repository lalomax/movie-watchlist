function searchMovie() {
  const titleMovie = document.getElementById('input-box').value
  // console.log(document.getElementsByTagName('main'))
  if (titleMovie) {
    document.getElementsByTagName('main')[0].innerHTML = `
    <section id="heading-search">
      </section>
    `
    fetch(`https://www.omdbapi.com/?s=${titleMovie}&apikey=38a301e7`)
      .then(res => res.json())
      .then(data => {
        data.Search.map(movie => {
          fetch(`https://www.omdbapi.com/?i=${movie.imdbID}&apikey=38a301e7`)
            .then(res => res.json())
            .then(data => {
              fillHtml(data, ["saveData(this)","Watchlist", "plus"])
            })

        })
      })
      .catch((error) => {
        console.error('Errores:', error);
        clearMain()
      });
  } else {
    clearMain()
  }
}

function loadLocalData() {
  event.preventDefault()
  document.querySelector('.searching-box').style.display = 'none'
  document.querySelector('.heading-primary-sub').innerHTML = `
  <a href="#" onclick="location.reload()">Find your film</a>
  `
  document.querySelector('.heading-primary-main').textContent = 'My watchlist'
  if (localStorage.length) {
    document.getElementsByTagName('main')[0].innerHTML = `
    <section id="heading-search">
      </section>
    `
    let imdbS = Object.keys(localStorage)
    for (let imdb of imdbS) {
      fetch(`https://www.omdbapi.com/?i=${imdb}&apikey=38a301e7`)
        .then(res => res.json())
        .then(data => {
          fillHtml(data, ["removeData(this)","Remove","subtract"])
        })
    }
  } else {
    clearMain()
  }
}

function saveData(local) {
  event.preventDefault()
  localStorage.setItem(local.name, local.name)
  // console.log(local.textContent)
  local.textContent = "✔Added"
}

function removeData(localKey) {
  event.preventDefault()
  localStorage.removeItem(localKey.name)
    localKey.parentElement.parentElement.parentElement.remove()
}

function clearMain() {
  document.getElementsByTagName('main')[0].innerHTML = `
    <div class="heading-start">
        <img src="./image/exploring.png" alt="exploring image">
        <h2>Start exploring</h2>
    </div>
      <section id="heading-search">
      </section>
    `
}

function fillHtml(data, action) {
  document.getElementById('heading-search').innerHTML += `
  <section class="heading-container">
    <img src=${data.Poster} alt="some image" />
      <article class="movie-data">
        <h3>
          ${data.Title} <img src="./image/star.png" alt="" /><span>${data.imdbRating}</span>
        </h3>
        <h4>
          <span>${data.Runtime}</span> <span>${data.Genre}</span>
          <a class="watchlist-anchor" name=${data.imdbID} href="#" onclick=${action[0]}><img src="./image/${action[2]}.png"  alt="Some Data" /> ${action[1]}</a>
        </h4>
        <p>${data.Plot}</p>
      </article>
  </section>
      `
}
