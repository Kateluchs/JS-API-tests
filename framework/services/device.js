import supertest from 'supertest'
import config from '../config/config'
import cameras from '../fixtures/devices'

const { url } = config

const camera = {
    create: (token, payload = cameras.randomCamera()) => {

        return supertest(url)
            .post('/api/webclient/cameras/create')
            .set('Content-type', 'application/json')
            .set('X-User-Token', `${token}`)
            .send(payload)
    },
    remove: (token, payload) => {
        //принимает на вход массив
        return supertest(url)
            .post('/api/webclient/cameras/remove')
            .set('Content-type', 'application/json')
            .set('X-User-Token', `${token}`)
            .send(payload)
    },

    removeVold: (token, payload) => {
        return supertest(url)
            .post('/api/webclient/cameras/remove/' + payload)
            .set('Content-type', 'application/json')
            .set('X-User-Token', `${token}`)
            .send()
    },

    getCameras: (token, payload = null) => {
        return supertest(url)
            .post('/api/webclient/cameras')
            .set('Content-type', 'application/json')
            .set('X-User-Token', `${token}`)
            .send(payload)
    },

    getDevices: (token, payload = null) => {
        return supertest(url)
            .post('/api/webclient/devices')
            .set('Content-type', 'application/json')
            .set('X-User-Token', `${token}`)
            .send(payload)
    },

    models:(token) => {
        return supertest(url)
            .get('/api/webclient/models')
            .set('Content-type', 'application/json')
            .set('X-User-Token', `${token}`)
            .send()
    }
}

const device = {
    
}


export default camera