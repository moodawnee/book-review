import express from "express";
import session from "express-session";
import morgan from "morgan";
import "./db";
import { localMiddleware } from "./middleware";
import BookReview from "./model/BookReview";
import User from "./model/User";
import { globalRouter } from "./router/globalRouter";

const app = express();

app.set("view engine", "pug");
app.set("views", process.cwd() + "/src/views");
app.use(express.urlencoded({ extended: true }));
//server listen
const PORT = 4400;

app.listen(PORT, () => {
    console.log(`server on http://localhost:${PORT}`);
});

//middleware
app.use(morgan("dev"));
app.use(session({
    secret: "hello!",
    resave: false,
    saveUninitialized: true,
}));
app.use(localMiddleware);

//router
app.use("/", globalRouter);

export default app;