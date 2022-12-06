import {default as request} from "supertest"
import makeApp from './app'


describe('POST, GET /exercise', ()=>{
    const createExercise = jest.fn()
    const getAllExercises = jest.fn()
    const getExerciseById = jest.fn()
    const app = makeApp({createExercise, getAllExercises, getExerciseById})

    it('should return 200 status code', async()=>{
        const response = await request(app).post('/exercise').send({
            startTime: "iphone",
            durationInSeconds: 123,
            activityType: "hejhej"
        })
        expect(response.statusCode).toBe(200)
    })

    it('should return 200 status code', async()=>{
        const response = await request(app).get('/exercise')
        expect(response.statusCode).toBe(200)
    })

    it('should return 404 status code', async()=>{
        const response = await request(app).get('/exercise/hejhej')
        expect(response.statusCode).toBe(404)
    })

    // it('should return 200 status code', async()=>{
    //     const response = await request(app).get('/exercise/638f1a447d525b4e86ea4c4f')
    //     expect(response.statusCode).toBe(200)
    // })

    

} )