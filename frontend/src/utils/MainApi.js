class MainApi {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(res.status);
  }

  register(name, email, password) {
    return fetch(`${this._baseUrl}/signup`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name,
        email,
        password,
      }),
    }).then(this._checkResponse);
  }

  login(email, password) {
    return fetch(`${this._baseUrl}/signin`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        email,
        password,
      }),
    }).then(this._checkResponse);
  }

  checkToken(token) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "GET",
      headers: {
        ...this._headers,
        "Authorization": `Bearer ${token}`,
      },
    }).then(this._checkResponse);
  }

  dataUser() {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "GET",
      headers: {
        ...this._headers,
        "Authorization": `Bearer ${localStorage.getItem("jwt")}`,
      },
    }).then(this._checkResponse);
  }

  updateDataUser(name, email) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: {
        ...this._headers,
        "Authorization": `Bearer ${localStorage.getItem("jwt")}`,
      },
      body: JSON.stringify({
        name,
        email,
      }),
    }).then(this._checkResponse);
  }

  getMovies() {
    return fetch(`${this._baseUrl}/movies`, {
      method: "GET",
      headers: {
        ...this._headers,
        "Authorization": `Bearer ${localStorage.getItem("jwt")}`,
      },
    }).then(this._checkResponse);
  }

  saveMovie(movie) {
    return fetch(`${this._baseUrl}/movies`, {
      method: "POST",
      headers: {
        ...this._headers,
        "Authorization": `Bearer ${localStorage.getItem("jwt")}`,
      },
      body: JSON.stringify({
        country: movie.country,
        director: movie.director,
        duration: movie.duration,
        year: movie.year,
        description: movie.description,
        image: `https://api.nomoreparties.co/${movie.image.url}`,
        trailerLink: movie.trailerLink,
        thumbnail: `https://api.nomoreparties.co${movie.image.formats.thumbnail.url}`,
        movieId: movie.id,
        nameRU: movie.nameRU,
        nameEN: movie.nameEN,
      }),
    }).then(this._checkResponse);
  }

  deleteMovie(movieId) {
    return fetch(`${this._baseUrl}/movies/${movieId}`, {
      method: "DELETE",
      headers: {
        ...this._headers,
        "Authorization": `Bearer ${localStorage.getItem("jwt")}`,
      },
    }).then(this._checkResponse);
  }
}

const mainApi = new MainApi({
  // baseUrl: "https://api.nikita-movie.nomoredomainsicu.ru",
  baseUrl: 'http://localhost:3000',
  headers: {
    "Accept": "application/json",
    "Content-Type": "application/json",
  },
});

export default mainApi;
