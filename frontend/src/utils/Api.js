import { BASE_URL } from './Auth'

class Api {
  constructor(config) {
    this._url = config.url;
    this._headers = config.headers;
  }

  // eslint-disable-next-line class-methods-use-this
  _getResponseData(res) {
    if (!res.ok) {
      // eslint-disable-next-line prefer-promise-reject-errors
      return Promise.reject(`Ошибка: ${res.status}`);
    }
    return res.json();
  }

  getProfile() {
    return fetch(`${this._url}/users/me`, {
      headers: this._headers,
    }).then((res) => this._getResponseData(res));
  }

  updateProfile(data) {
    return fetch(`${this._url}/users/me`, {
      headers: this._headers,
      method: 'PATCH',
      body: JSON.stringify(data),
    }).then((res) => this._getResponseData(res));
  }

  changeAvatar(data) {
    return fetch(`${this._url}/users/me/avatar`, {
      headers: this._headers,
      method: 'PATCH',
      body: JSON.stringify(data),
    }).then((res) => this._getResponseData(res));
  }

  getInitialCards(token) {
    return fetch(`${this._url}/cards`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        'content-type': 'application/json',
      },
    }).then((res) => this._getResponseData(res));
  }

  postCard(data) {
    return fetch(`${this._url}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify(data),
    }).then((res) => this._getResponseData(res));
  }

  changeLikeCardStatus(cardId, isLiked) {
    return fetch(`${this._url}/cards/${cardId}/likes`, {
      method: `${isLiked ? 'PUT' : 'DELETE'}`,
      headers: this._headers,
    }).then((res) => this._getResponseData(res));
  }

  removeCard(cardId) {
    return fetch(`${this._url}/cards/${cardId}`, {
      method: 'DELETE',
      headers: this._headers,
    }).then((res) => this._getResponseData(res));
  }
}

const api = new Api({
  url: BASE_URL,
  headers: {
    Authorization: `Bearer ${localStorage.getItem('token')}`,
    'content-type': 'application/json',
  },
});

export default api;
