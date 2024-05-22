import express, { NextFunction, Request, Response } from "express";

import "express-async-errors";
import * as dotenv from "dotenv";

import * as http from "http";
import cors from "cors";

import { ApiKeyStrategy, OAuthStrategy, createClient } from "@wix/sdk";
import { posts } from '@wix/blog';
import { categories } from '@wix/blog';
import { items } from '@wix/data';
import swaggerUi from "swagger-ui-express";
import { AppController } from "./route";
import path from 'path';
import * as swaggerDocument from '../public/swagger.json';
dotenv.config();

const app = express();

const port = process.env.PORT || 3000;
const server: http.Server = http.createServer(app);

app.use(cors());
const swaggerFilePath = path.resolve(__dirname, './swagger.json');
app.use(express.json());
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));


const wixClient = createClient({
  modules: { categories, items, posts },
  auth:OAuthStrategy({ clientId: '52ea8bca-a466-4157-928b-78d57806dc60'   })
});
app.get('/posts', async (req, res) => {
  const appController = new AppController()
  const response = await appController.handle()
  return res.send(response);
})

app.post('/webhook', async (req, res) => {
  const appController = new AppController()
  const response = await appController.handleWebhook()
  console.log(response)
  return res.send(response)
})





app.listen(port);




export { server };