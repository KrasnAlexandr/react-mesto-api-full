import { BASE_URL } from "./constants";

class Api {

    #mainUrl;

    constructor({ mainUrl }) {
        this.#mainUrl = mainUrl;
    }

    // базовый метод для првоерки соединения
    #checkResponse(res) {
        if (res.ok) {
            return res.json();
        } else {
            return Promise.reject(`Ошибка: ${res.status} => ${res.statusText}`);
        }
    }

    // метод для загрузки данных пользователя с сервера
    getUserInfo() {
        return fetch(`${this.#mainUrl}/users/me`, {
            headers: {
                'Content-Type': 'application/json',
                Accept: "application/json",
                Authorization: `Bearer ${localStorage.getItem('jwt')}`,
            },
        })
            .then(res => this.#checkResponse(res));
    }

    // метод для загрузки всех карточек с сервера
    getInitialCards() {
        return fetch(`${this.#mainUrl}/cards`, {
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem('jwt')}`,
            },
        })
            .then(res => this.#checkResponse(res));
    }

    // метод для обновления данных профиля
    updateUserInfo({ name, about }) {
        return fetch(`${this.#mainUrl}/users/me`, {
            method: 'PATCH',
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem('jwt')}`,
            },
            body: JSON.stringify({
                name: `${name}`,
                about: `${about}`
            })

        })
            .then(res => this.#checkResponse(res));
    }

    // метод добавления новой карточки
    addNewCard({ name, link }) {
        return fetch(`${this.#mainUrl}/cards`, {
            method: 'POST',
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem('jwt')}`,
            },
            body: JSON.stringify({
                name: `${name}`,
                link: `${link}`
            })

        })
            .then(res => this.#checkResponse(res));
    }

    // метод удаления карточки
    deleteThisCard(cardId) {
        return fetch(`${this.#mainUrl}/cards/${cardId}`, {
            method: 'DELETE',
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem('jwt')}`,
            },
        })
            .then(res => this.#checkResponse(res));
    }

    updateUserAvatar({ avatar }) {
        return fetch(`${this.#mainUrl}/users/me/avatar`, {
            method: 'PATCH',
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem('jwt')}`,
            },
            body: JSON.stringify({
                avatar: `${avatar}`
            })

        })
            .then(res => this.#checkResponse(res));
    }

    likeThisCard(cardId) {
        return fetch(`${this.#mainUrl}/cards/${cardId}/likes`, {
            method: 'PUT',
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem('jwt')}`,
            },
        })
            .then(res => this.#checkResponse(res));
    }

    dislikeThisCard(cardId) {
        return fetch(`${this.#mainUrl}/cards/${cardId}/likes`, {
            method: 'DELETE',
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem('jwt')}`,
            },
        })
            .then(res => this.#checkResponse(res));
    }
}

const authorizationData = {
    mainUrl: BASE_URL,
};

const api = new Api(authorizationData);

export default api;

