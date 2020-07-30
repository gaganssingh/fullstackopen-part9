import express from "express";
import cors from "cors";

// import pingRouter from "./routes/pingRouter";
import diagnosesRouter from "../routes/diagnosesRouter";

const app = express();

app.use(express.json()); // Body parser
app.use(cors()); // Enable cors requests

// Routes
app.get("/api/ping", (_req, res) => {
   console.log("someone pinged here");
   res.send("Patientor Backend");
});

app.use("/api/diagnosis", diagnosesRouter);

const PORT = 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
