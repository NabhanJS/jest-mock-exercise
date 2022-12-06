import makeApp from "./app"
import mongoose from 'mongoose';
import { getExerciseById, getAllExercises, createExercise} from "./db/databas"

const port = process.env.PORT || 8080;

const app = makeApp({getExerciseById,
    getAllExercises,
    createExercise})

mongoose.connect("mongodb://localhost:27017/myapp").then(() => {
    app.listen(port, () => {
        console.log(`App listening to port ${port}`)
    })
})