import gql from "graphql-tag";

export const typeDefs = gql`
    type Query {
        findUserById(id : ID!) : UserSummary
        findArticles: [Article!]
        findArticleById(id: ID!) : Article
    }

    type Mutation {
        createUser(username: String!, password: String!): CreateUserResponse!
        signIn(username: String!, password: String!): SignInResponse!
        createArticle(title: String, content: String!): CreateArticleResponse!
        updateArticle(id: ID!): UpdateArticleResponse!
        deleteArticle(id: ID!): DeleteArticleResponse!
        deleteArticleDislike(articleId: ID!, userId: ID!): Dislike
        deleteCommentDislike(commentId: ID!, userId: ID!): Dislike
        addArticleDislike(articleId: ID!, userId: ID!): Dislike
        addCommentDislike(commentId: ID!, userId: ID!): Dislike
    }
    
    type UserSummary {
        id: ID!
        username: String!
        bio: String
        createdAt: String!
    }

    type CreateUserResponse {
        code: Int!
        success: Boolean!
        message: String!
        user: UserSummary
    }
    type SignInResponse {
        code: Int!
        success: Boolean!
        message: String!
        token: String
    }
    type CreateArticleResponse {
        code: Int!
        success: Boolean!
        message: String!
        article: Article
    }
    type UpdateArticleResponse {
        code: Int!
        success: Boolean!
        message: String!
    }
    type DeleteArticleResponse {
        code: Int!
        success: Boolean!
        message: String!
    }
    type User {
        id : ID!
        username : String!
        articles : [Article]
        comments : [Comment]
        dislikes : [Dislike]
        bio : String
        createdAt : String
    }

    type Dislike{
        id : ID!
        user : User!
        article : Article
        comment : Comment
    }

    type Article {  
        id : ID!
        title : String
        content : String!
        author : User!
        dislikes : [Dislike]
        comments : [Comment]
    }

    type Comment {
        id : ID!
        content : String!
        author : User!
        dislikes : [Dislike]
    }
`;

