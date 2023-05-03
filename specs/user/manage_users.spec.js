import { faker } from '@faker-js/faker'
import user from '../../framework/services/user'


let token

beforeAll(async () => {
    token = await user.getAuthToken()
})

describe('Manage Users', () => {
    describe('POST /api/webclient/users/create', () => {
        test('Positive Create User', async () => {
            const res = await user.create(token)
            expect(res.status).toEqual(200);
            expect(res.body).toEqual({ status: 'OK', message: null })
        });

        test('Negative Create User: user exists', async () => {
            const input = {
                "params": {
                    "name": "admin",
                    "description": "Самый лучший администратор",
                    "enabled": true
                },
                "login": "admin",
                "password": "qwerty"
            }
            const res = await user.create(token, input)
            expect(res.status).toEqual(200);
            expect(res.body).toEqual({ status: 'EXISTS_USER', message: 'EXISTS_USER' });
        });

        test('Negative Create User: empty data', async () => {
            const res = await user.create(token, {})
            expect(res.status).toEqual(400);
            expect(res.body).toEqual({ status: 'BAD_REQUEST', message: 'BAD_REQUEST' });
        });

        test('Negative Create User: invalid token', async () => {
            const res = await user.create(faker.datatype.uuid())
            expect(res.status).toEqual(403);
            expect(res.body).toEqual({ status: 'INVALID_TOKEN', message: 'Invalid token' });
        });
    })

    describe('POST /api/webclient/users/remove/LOGIN_NAME', () => {

        test('Positive Remove User', async () => {

            // Create user
            const input = await user.randomUserCred()
            await user.create(token, input)

            //  Delete this user
            const res = await user.remove(token, input.login)
            expect(res.body).toEqual({ status: 'OK', message: null })
        });
    })

    describe('GET /api/webclient/users/params/LOGIN_NAME', () => {

        test('Get User Info', async () => {
            // Create user
            const input = await user.randomUserCred()
            await user.create(token, input)

            //  Get info of this user
            const res = await user.getInfo(token, input.login)
            expect(res.body).toEqual({ name: input.params.name, description: input.params.description, enabled: input.params.enabled, admin: false, status: 'OK', message: null })
        });
    })
})