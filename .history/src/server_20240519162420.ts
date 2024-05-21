import express, { NextFunction, Request, Response } from "express";

import "express-async-errors";
import * as dotenv from "dotenv";

import * as http from "http";
import cors from "cors";
import { router } from "./route";
import { ApiKeyStrategy, createClient } from "@wix/sdk";
import { posts } from '@wix/blog';




dotenv.config();

const app = express();

const port = process.env.PORT || 3000;
const server: http.Server = http.createServer(app);

app.use(cors());

app.use(express.json());

app.use(router)

const wixClient = createClient({
  modules: { posts },
  auth: ApiKeyStrategy({
    siteId: '88e76dc7-a4cf-45d2-9e7d-410b308c2344',
    apiKey: process.env.WIX_API_KEY 
  })
});


router.get("/posts", async (req, res)=> {
  const response = await wixClient.posts.listPosts();
  return res.json(response)
})
app.listen(port);




export { server };