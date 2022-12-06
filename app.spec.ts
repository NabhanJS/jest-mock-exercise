import {default as request} from "supertest"
import makeApp from './app'


describe('POST /products', ()=>{
    const createExercise = jest.fn()
    const app = makeApp({createExercise})

    it('should return 200 status code', async()=>{
        const response = await request(app).post('/exercise').send({
            startTime: "iphone",
            durationInSeconds: 123,
            activityType: "hejhej"
        })
        expect(response.statusCode).toBe(200)
    })
} )