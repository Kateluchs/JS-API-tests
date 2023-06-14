import { faker } from '@faker-js/faker'
import { expect, jest, test } from '@jest/globals';
import user from '../../framework/services/user'
import { camera, device } from '../../framework/services/device'
import { cameras, devices } from '../../framework/fixtures/devices'



let token

beforeAll(async () => {
    token = await user.getAuthToken()
})

describe('Manage Cameras', () => {
    describe('POST /api/webclient/cameras/create', () => {

        test.each
            `
        Name                       | createCamera                             | expected
        ${'random camera'}         | ${cameras.randomCamera()}                | ${200}
        ${'ptz camera'}            | ${cameras.ptzCamera()}                   | ${200}    
        ${'cloud camera'}          | ${cameras.cloudCamera()}                 | ${200}          
        ${'echd camera'}           | ${cameras.echdCamera()}                  | ${200} 
        ${'empty camera'}          | ${''}                                    | ${400}  
        ${'with invalid token'}    | ${cameras.randomCamera()}                | ${403}
        `
            ('Returns $expected when creating $Name', async ({ createCamera, expected }) => {
                if (expected == 403) {
                    const res = await camera.create(faker.datatype.uuid(), await createCamera)
                    expect(res.status).toEqual(expected);
                }
                else {
                    const res = await camera.create(token, await createCamera)
                    expect(res.status).toEqual(expected);
                }
            });


        test('License Restriction', async () => {
            let camerasArr = []
            for (let i = 0; i < 16; i++) {
                const camCreated = await camera.create(token, await cameras.randomCamera())
                if (camCreated.body.id) {
                    camerasArr.push(camCreated.body.id)
                }

            }
            const res = await camera.create(token, await cameras.randomCamera())
            expect(res.status).toEqual(200);
            camerasArr.push(res.body.id)
            expect(res.body.status).toEqual('LICENSE_RESTRICTION')

            // await camera.remove(token, await cameras.removeCameras(camerasArr))

            for (let i = 0; i < camerasArr.length; i++) {
                const res = await camera.removeVold(token, camerasArr[i])
            }
 
        });



        /*   На текущем релизе не работает
        describe('POST /api/webclient/cameras/remove', () => {
               
               test('Positive Create Camera', async () => {
                   let camerasArr = []
                   const camCreated = await camera.create(token, await cameras.randomCamera())
                   camerasArr.push(camCreated.body.id)
       
                   const res = await camera.remove(token, await cameras.removeCameras(camerasArr))
                   console.log(res.body)
                   expect(res.status).toEqual(200);
                   expect(res.body.status).toEqual('OK')
                   
               });
           })
           */
    })
    describe('POST /api/webclient/cameras', () => {
        test('Positive Get Cameras without body', async () => {
            const res = await camera.getCameras(token)
            expect(res.status).toEqual(200);
            expect(res.body.status).toEqual('OK')

        });
        test('Positive Get Cameras with body', async () => {
            const res = await camera.getCameras(token, cameras.getCamerasbody())
            expect(res.status).toEqual(200);
            expect(res.body.status).toEqual('OK')
            

        });
        test('Negative Get Cameras', async () => {
            const res = await camera.getCameras(faker.datatype.uuid(), cameras.getCamerasbody())
            expect(res.status).toEqual(403);
            expect(res.body).toEqual({ status: 'INVALID_TOKEN', message: 'Invalid token' });

        });

    })

    describe('POST /api/webclient/devices', () => {
        test('Positive Get Devices without body', async () => {
            const res = await device.getDevices(token)
            expect(res.status).toEqual(200);
            expect(res.body.status).toEqual('OK')

        });
        test('Positive Get Devices with body', async () => {
            const res = await device.getDevices(token, devices.getDevices)
            expect(res.status).toEqual(200);
            expect(res.body.status).toEqual('OK')

        });
        test('Negative Get Devices', async () => {
            const res = await device.getDevices(faker.datatype.uuid())
            expect(res.body).toEqual({ status: 'INVALID_TOKEN', message: 'Invalid token' });

        });

    })

    describe('POST /api/webclient/models', () => {
        test('Positive Get models', async () => {
            const res = await camera.models(token)
            expect(res.status).toEqual(200);
            expect(res.body.status).toEqual('OK')
            expect(res.body).toMatchSnapshot();
        });

    })


});