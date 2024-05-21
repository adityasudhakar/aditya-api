import { createClient, ApiKeyStrategy } from '@wix/sdk';
import { posts } from '@wix/blog';
import { Router } from 'express';

const router = Router()
const wixClient = createClient({
  modules: { posts },
  auth: ApiKeyStrategy({
    siteId: '88e76dc7-a4cf-45d2-9e7d-410b308c2344',
    apiKey: process.env.WIX_API_KEY 
  })
});

async function getPost(postId, options) {
  const response = await wixClient.posts.getPost(postId, options);
}

router.get("/posts", async (req, res)=> {
  const response = await wixClient.posts.listPosts();
  return res.json(response)
})

