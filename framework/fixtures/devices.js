import { faker } from '@faker-js/faker'
import * as lodash from 'lodash'



export const cameras = {

    randomCamera() {
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
    ptzCamera() {
        return (lodash.merge(this.randomCamera(), {
            "model": "otherptz",
            "ptz": true

        }))
    },

    cloudCamera() {
        return (lodash.merge(this.randomCamera(), {
            "cloud": true

        }))
    },

    echdCamera() {
        return (lodash.merge(this.randomCamera(), {
            "cloud": true

        }))
    },

    // accepts an array of cameras
    removeCameras(camerasToRemove) {
        return ({
            "cameras": camerasToRemove
        })
    },
    getCamerasbody() {
        return ({
            
                "orderBy": "NAME",
                "isAscending": true,
                "filterText": "",
                "forUser": "admin", // then create a user on request
                "ignorePermissions": true               
        })
    }
}

export const devices = {
    
    getDevices() {
        return ({
            
                "orderBy": "NAME",
                "isAscending": true,
                "filterText": "",
                "forUser": "admin", // then create a user on request
                "ignorePermissions": true     
        })
    }
}