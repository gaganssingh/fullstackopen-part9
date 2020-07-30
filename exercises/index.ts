import express from "express";
const app = express();
import { calculateBmi } from "./bmiCalculator";
import { calculateExercises } from "./exerciseCalculator";

app.use(express.json()); // body parser

app.get("/hello", (_req, res) => {
   res.send("Hello Full Stack");
});

app.get("/bmi", (req, res) => {
   const height = Number(req.query.height);
   const weight = Number(req.query.weight);

   if (!height || !weight) {
      res.status(400).send({ error: "Please specify both height and weight" });
   }

   try {
      const bmi = calculateBmi(height, weight);
      res.json({
         height,
         weight,
         bmi,
      });
   } catch (error) {
      res.status(500).send(error.message);
   }
});

app.post("/exercises", (req, res) => {
   const target = req.body.target;
   const log = req.body.daily_exercises;

   if (!log || !target) {
      res.send({ error: "parameters missing" });
   }

   if (
      !isNaN(Number(target)) &&
      Array.isArray(log) &&
      log.every((exercise) => !isNaN(Number(exercise)))
   ) {
      const parsedTarget = Number(target);
      const parsedLog = log.map((exercise) => Number(exercise));

      try {
         res.json(calculateExercises(parsedLog, parsedTarget));
      } catch (error) {
         res.send({ error: error.message });
      }
   } else {
      res.send({ error: "malformed parameters" });
   }

   res.send({ error: "unknown error" });
});

const PORT = 3004;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
