import express from "express";
import cors from "cors";
import { requestLogger } from "../middleWare/logger.js";

export default function(app) {
    app.use(cors());
    app.use(express.json());
    app.use(requestLogger);
}