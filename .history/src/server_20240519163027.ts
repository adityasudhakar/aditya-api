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
    siteId: '8a0ee5f2-c4a3-4061-8f85-7c45ad1fa8f3',
    apiKey:"IST.eyJraWQiOiJQb3pIX2FDMiIsImFsZyI6IlJTMjU2In0.eyJkYXRhIjoie1wiaWRcIjpcIjE4NjYzNDBkLTUyYzYtNDRkZi04YzYxLTYwOGZjZGRjMzU4YVwiLFwiaWRlbnRpdHlcIjp7XCJ0eXBlXCI6XCJhcHBsaWNhdGlvblwiLFwiaWRcIjpcIjU2YTkyMDhmLTVlMmItNGYzNS05YWVmLWIwZTY2MDI3Njk0M1wifSxcInRlbmFudFwiOntcInR5cGVcIjpcImFjY291bnRcIixcImlkXCI6XCI4YTBlZTVmMi1jNGEzLTQwNjEtOGY4NS03YzQ1YWQxZmE4ZjNcIn19IiwiaWF0IjoxNzE2MTI4ODUyfQ.iqO59sp446JK7c8qvGpRFQGuiea86HWFWIJzzB0FgA8ZsX5por9IfStZRR9kfRHV3hV6Y09mPvP7VxuhYbey7ZDkIzPqAwOs6iAA0Vedbe3D327cpllPrg-RFbAeSaIp6dlh0K3ygGnW6MMsAfY_Krv7Rd5O37btzn4lWV0AiQp_59qF5o86gsIg37omgY1J6H0umy0aNxztZ2LHMx5D0xDWXnDDtutPD8uSGUOsw54Ciu_aIw4QH6z57i2Bg9pnfunH-qtzQRhR6buyEPAgNy2XUV4nkNg85fMSDdt664wQCADg9IV5KuFTueQ6-GYvH-wWihen7antOsbr6qQY8w"
  })
});


app.get("/posts", async (req, res)=> {
  const response = await wixClient.posts.listPosts();
  console.log("this",response)
  return res.json(response)
})
app.listen(port);




export { server };