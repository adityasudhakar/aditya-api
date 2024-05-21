import express, { NextFunction, Request, Response } from "express";

import "express-async-errors";
import * as dotenv from "dotenv";

import * as http from "http";
import cors from "cors";
import { router } from "./route";





dotenv.config();

const app = express();

const port = process.env.PORT || 3000;
const server: http.Server = http.createServer(app);

app.use(cors());

app.use(express.json());
app.use(router)
app.listen(port);




export { server };