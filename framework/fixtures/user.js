import { faker } from '@faker-js/faker'
import * as lodash from 'lodash'


const users = {
    randomUser() {
        return ({
            "params": {
                "name": faker.name.fullName(),
                "description": faker.lorem.sentence(),
                "enabled": faker.datatype.boolean()
            },
            "login": faker.internet.userName(),
            "password": faker.internet.password()
        }
        )
    },

    activeUser() {
        return (lodash.merge(this.randomUser(), {
            "enabled": true
        }))
    },

      firstUser(){
           return(lodash.merge(this.randomUser(), {
            "login": "admin"
        }))
 }
}

export default users