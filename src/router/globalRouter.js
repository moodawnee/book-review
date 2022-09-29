import express from "express";
import { getRegister, getReviewEdit, home, postRegister, postReviewEdit, reviewDelete, reviewWatch } from "../controller/reviewController";
import { getJoin, getLogin, postJoin, postLogin } from "../controller/userController";

export const globalRouter = express.Router();

globalRouter.get("/", home);
globalRouter.route("/review_register").get(getRegister).post(postRegister);
globalRouter.route("/join").get(getJoin).post(postJoin);
globalRouter.route("/login").get(getLogin).post(postLogin);
globalRouter.get("/:id([0-9a-f]{24})", reviewWatch);
globalRouter.route("/:id([0-9a-f]{24})/edit").get(getReviewEdit).post(postReviewEdit);
globalRouter.get("/:id([0-9a-f]{24})/delete", reviewDelete);