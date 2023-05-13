import { faker } from '@faker-js/faker'
var _ = require('lodash');

const cameras = {

    async randomCamera() {
        return (
            {
                "name": faker.lorem.words(),
                "description": faker.lorem.sentence(),
                "vendor": "other",
                "model": "otherfixed",
                "host": "127.0.0.1",
                //  "channel": faker.datatype.number(),
                "login": faker.internet.userName(),
                "password": faker.internet.password(),
                "httpPort": faker.internet.port(),
                "rtspPort": 554,
                //    "onvifPort": faker.internet.port(),
                //   "location": null,
                //    "lat": faker.address.longitude()[0],
                //    "lon": faker.address.longitude()[1],
                //    "direction": faker.datatype.number({ min: 0, max: 270, precision: 0.01 }),
                "ptz": faker.datatype.boolean(),
                "tcp": faker.datatype.boolean(),
                "cloud": faker.datatype.boolean(),
                "echd": faker.datatype.boolean(),
                //    "archive": null,
                //   "spot": null
            })
    },
    async ptzCamera() {
        return (_.merge(await this.randomCamera(), {
            "model": "otherptz",
            "ptz": true

        }))
    },

    async cloudCamera() {
        return (_.merge(await this.randomCamera(), {
            "cloud": true

        }))
    },

    async echdCamera() {
        return (_.merge(await this.randomCamera(), {
            "cloud": true

        }))
    },

    // принимает на вход массив камер
    async removeCameras(camerasToRemove) {
        return ({
            "cameras": camerasToRemove
        })
    },
    async getCamerasbody() {
        return ({
            
                "orderBy": "NAME",
                "isAscending": true,
                "filterText": "",
                "forUser": "user1",
                "ignorePermissions": true
               
               
        })
    },
    async getDevices() {
        return ({
            
                "orderBy": "NAME",
                "isAscending": true,
                "filterText": "",
                "forUser": "user1",
                "ignorePermissions": true
               
               
        })
    }


}

const devices = {
    
}

export default cameras
