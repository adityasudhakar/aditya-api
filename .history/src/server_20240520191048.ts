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

app.use(router)

const wixClient = createClient({
  modules: { categories, items  },
  auth:OAuthStrategy({ clientId: 'f7f27577-c775-422e-842f-60cfe15eb90a'  })
});


app.get("/posts", async (req, res, next: NextFunction)=> {
  try{
    const dataCollectionId = 'Blog/Categories';
    const dataItemsList = await wixClient.items
        .queryDataItems({
          dataCollectionId,
        })
        .find();
    return res.json(dataItemsList)
  }catch(err){
    next(err)
  }

})
app.listen(port);




export { server };