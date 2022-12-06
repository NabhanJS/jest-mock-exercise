import makeApp from "./app"
import mongoose from 'mongoose';
import { getExerciseById, getAllExercises, createExercise} from "./db/databas"

const app = makeApp({getExerciseById, getAllExercises, createExercise})

const port = process.env.PORT || 8080;


mongoose.connect("mongodb://localhost:27017/myapp").then(() => {
    app.listen(port, () => {
        console.log(`App listening to port ${port}`)
    })
})