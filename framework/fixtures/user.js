import { faker } from '@faker-js/faker'
var _ = require('lodash');


const users = {
    async randomUser() {
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

    async activeUser() {
        return (_.merge(await this.randomUser(), {
            "enabled": true
        }))
    },

      async firstUser(){
           return(_.merge(await this.randomUser(), {
            "login": "admin"
        }))
 }
}

export default users