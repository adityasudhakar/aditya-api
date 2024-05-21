import express, { NextFunction, Request, Response } from "express";

import "express-async-errors";
import * as dotenv from "dotenv";

import * as http from "http";
import cors from "cors";
import { router } from "./route";
import { ApiKeyStrategy, OAuthStrategy, createClient } from "@wix/sdk";
import { posts } from '@wix/blog';
import { categories } from '@wix/blog';
import { items } from '@wix/data';


dotenv.config();

const app = express();

const port = process.env.PORT || 3000;
const server: http.Server = http.createServer(app);

app.use(cors());

app.use(express.json());



const wixClient = createClient({
  modules: { categories, items, posts },
  auth:OAuthStrategy({ clientId: '52ea8bca-a466-4157-928b-78d57806dc60'   })
});


app.get("/posts", async (req, res, next: NextFunction)=> {
  try{
    const dataCollectionId = 'Blog/Categories';
    const dataItemsList = await wixClient.posts
    return res.json(dataItemsList)
  }catch(err){
    next(err)
  }

})
app.listen(port);




export { server };