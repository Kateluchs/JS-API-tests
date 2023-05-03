import supertest from 'supertest'
import config from '../config/config'
import users from '../fixtures/user'

const { url } = config

let token

// Контроллер user
const user = {
    /**
     * Функция для авторизации
     * 
     * @param {object} payload - Входные данные для авторизации
     * @param {string} payload.login - Имя пользователя
     * @param {string} payload.password - Пароль пользователя
     * @return {object} - ответ от сервера
     */
    login: (payload) => {

        return supertest(url)
            .post('/api/webclient/login')
            .set('Content-type', 'application/json')
            .send(payload)
    },

    
    async getAuthToken() {
        const payload = config.credentials
        const res = await this.login(payload)
        return res.headers['x-user-token']
    },
    

    create: (token, payload = users.randomUser()) => {

        return supertest(url)
            .post('/api/webclient/users/create')
            .set('Content-type', 'application/json')
            .set('X-User-Token', `${token}`)
            .send(payload)
    },

    // Здесь будет кэш
    /*  async getAuthTokenWithCache() {
            if (token) {
                return token
            }
    
            token = await this.getAuthToken()
    
            return token
        },
   */
    getInfo: (token, login) => {
        return supertest(url)
            .get(`/api/webclient/users/params/${login}`)
            .set('Accept', 'application/json')
            .set('X-User-Token', `${token}`)
            .send()
    },

    getInfoAll: (token) => {
        return supertest(url)
            .get(`/api/webclient/users?orderBy=LOGIN`)
            .set('Accept', 'application/json')
            .set('X-User-Token', `${token}`)
            .send()
    },

    remove: (token, login) => {
        return supertest(url)
            .post(`/api/webclient/users/remove/${login}`)
            .set('Accept', 'application/json')
            .set('X-User-Token', `${token}`)
            .send()
    }

}

export default user
