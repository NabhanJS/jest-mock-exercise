import {default as request} from "supertest"
import makeApp from './app'
import nock from 'nock';


describe('POST, GET /exercise', ()=>{
    const createExercise = jest.fn()
    const getAllExercises = jest.fn()
    const getExerciseById = jest.fn()

    const app = makeApp({createExercise, getAllExercises, getExerciseById})

    it('should return 200 status code', async()=>{
        const response = await request(app).post('/exercise').send({
            startTime: "12:00",
            durationInSeconds: 60,
            activityType: "running"
        })
        console.log(response.body)
        expect(response.statusCode).toBe(200)
    })

    // visa Jonathan om denna test // 
    it("should return 200 status code if sending invalid post data", async () => {
        const response = await request(app).post('/exercise').send({
            startTime: "14:00",
            durationInSeconds: 60,
            activityType: "gym"
        })
        expect(response.statusCode).toBe(200);
    })

    it('should return 200 status code if valid', async()=>{
        const response = await request(app).get('/exercise')
        expect(response.statusCode).toBe(200)
    })

    it('should return 200 status code if valid id', async()=>{
        getExerciseById.mockResolvedValueOnce({
            "_id": "638f136408e0d3d304c3c160",
            "startTime": "hej",
            "durationInSeconds": 12,
            "activityType": "hej",
            "__v": 0
        })
        const response = await request(app).get('/exercise/638f1a447d525b4e86ea4c4f')
        expect(response.statusCode).toBe(200)
    })

    it('should return 404 status code if invalid id', async()=>{
        const response = await request(app).get('/exercise/ah7shdt2u')
        expect(response.statusCode).toBe(404)
    })
} )