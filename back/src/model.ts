import { Dislike, Comment, Article } from "@prisma/client";

export type UserModel = {
    id : String
    username : String
    articles : [Article]
    comments : [Comment]
    dislikes : [Dislike]
    bio : String
    createdAt : String
};

export type DislikeModel = Dislike;
export type CommentModel = Comment;
export type ArticleModel = Article;
