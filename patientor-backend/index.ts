import express from "express";
const app = express();
app.use(express.json()); // Body parser

app.get("/ping", (_req, res) => {
   console.log("someone pinged here");
   res.send("Patientor Backend");
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
