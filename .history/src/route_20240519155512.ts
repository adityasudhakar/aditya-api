import { createClient, ApiKeyStrategy } from '@wix/sdk';
import { posts } from '@wix/blog';

const wixClient = createClient({
  modules: { posts },
  auth: ApiKeyStrategy({
    siteId: 'MY-SITE-ID',
    apiKey: process.env.WIX_API_KEY 
  })
});

async function getPost(postId, options) {
  const response = await wixClient.posts.getPost(postId, options);
}
