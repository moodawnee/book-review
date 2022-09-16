import express from "express";
import { home } from "../controller/globalController";

export const globalRouter = express.Router();

globalRouter.get("/", home);