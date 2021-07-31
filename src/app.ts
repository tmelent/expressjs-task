import express from "express";
import applyMiddleware from "../middleware/applyMiddleware";

const app = express();

applyMiddleware(app);

export default app;
