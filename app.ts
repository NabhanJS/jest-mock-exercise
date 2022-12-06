import express, { json } from "express";
import axios from "axios";
import mongoose from "mongoose";
// import { getExerciseById, getAllExercises, createExercise } from "./db/databas";
import { ExerciseModel } from "./db/databas";

const app = express();

app.use(json());

const makeApp = ({ getExerciseById, getAllExercises, createExercise }: any) => {


  app.post("/exercise", async (req, res) => {
    const exercise = await createExercise(req.body);
    res.json(exercise);
  });

  app.get("/exercise", async (req, res) => {
    const allExercises = await getAllExercises()
    res.json(allExercises);
  });

  app.get("/exercise/:id", async (req, res) => {
    const exercise = await getExerciseById(req.params.id);

    if (!exercise) {
      res.status(404).send();
    } else {
      const weatherAPI = await axios.get(
        "https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&start_date=2022-06-08&end_date=2022-06-08&daily=temperature_2m_max&timezone=GMT"
      );
      res.json({
        startTime: exercise.startTime,
        durationInSeconds: exercise.durationInSeconds,
        activityType: exercise.activityType,
        temperature: weatherAPI.data.daily.temperature_2m_max[0],
      });
    }
  });
  return app;
};

export default makeApp;
