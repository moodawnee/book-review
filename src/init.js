import express from "express";
import morgan from "morgan";
import "./db";
import { globalRouter } from "./router/globalRouter";

const app = express();

app.set("view engine", "pug");
app.set("views", process.cwd() + "/src/views");

//server listen
const PORT = 4400;

app.listen(PORT, () => {
    console.log(`server on http://localhost:${PORT}`);
});

//middleware
app.use(morgan("dev"));

//router
app.use("/", globalRouter);

export default app;