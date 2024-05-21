import { ApiKeyStrategy, OAuthStrategy, createClient } from "@wix/sdk";
import { posts } from '@wix/blog';
import { categories } from '@wix/blog';
import { items } from '@wix/data';
import { Get, Post, Route } from "tsoa";
import { NextFunction, Request, Response } from "express";

interface RootObject {
  title: string;
  excerpt: string;
  firstPublishedDate: string;
  lastPublishedDate: string;
  slug: string;
  featured: boolean;
  pinned: boolean;
  categoryIds: any[];
  memberId: string;
  hashtags: any[];
  commentingEnabled: boolean;
  minutesToRead: number;
  tagIds: any[];
  relatedPostIds: any[];
  pricingPlanIds: any[];
  language: string;
  preview: boolean;
  contentId: string;
  mostRecentContributorId: string;
  media: Media;
  hasUnpublishedChanges: boolean;
  translations: any[];
  customExcerpt: boolean;
  internalCategoryIds: any[];
  internalRelatedPostIds: any[];
  _id: string;
}



interface Media {
  displayed: boolean;
  custom: boolean;
}

interface hookresponse{
  message: string
}

const wixClient = createClient({
  modules: { categories, items, posts },
  auth:OAuthStrategy({ clientId: '52ea8bca-a466-4157-928b-78d57806dc60'   })
});

@Route("/")
export class AppController{
@Get("post")
async handle(): Promise<posts.ListPostsResponse>{
    const dataCollectionId = 'Blog/Categories';
    const dataItemsList = await wixClient.posts.listPosts()
    return dataItemsList;
}
@Post("webhook")
async handleWebhook():Promise<hookresponse>{
  return {
    message:"hook recieved"
  }
} 
}