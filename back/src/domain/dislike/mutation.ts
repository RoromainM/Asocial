import { MutationResolvers } from "../../types.js";
import { WithRequired } from "../../utils/mapped-type.js";

// Article Dislike

export const deleteArticleDislike: NonNullable<MutationResolvers['deleteArticleDislike']> = async (_, {articleId, userId}, {dataSources: {db}}) => {
    try {
        const dislike = await db.dislike.findFirst({
            where: {
                articleId,
                userId
            }
        })

        if (!dislike) {
            throw new Error('Dislike not found')
        }
        
        await db.dislike.delete({
            where: {
                id: dislike.id
            }
        })

        return dislike;
    } catch {
        throw new Error('Dislike has not been deleted');
    }
}

export const addArticleDislike: NonNullable<MutationResolvers['addArticleDislike']> = async (_, {articleId, userId}, {dataSources: {db}}) => {
    try {
        const dislike = await db.dislike.create({
            data: {
                articleId,
                userId
            }
        });

        return dislike;
    } catch {
        throw new Error('Dislike has not been added');
    }
}


// Comment Dislike

export const deleteCommentDislike: NonNullable<MutationResolvers['deleteCommentDislike']> = async (_, {commentId, userId}, {dataSources: {db}}) => {
    try {
        const dislike = await db.dislike.findFirst({
            where: {
                commentId,
                userId
            }
        })

        return dislike;
    } catch {
        throw new Error('Dislike has not been deleted');
    }
}

export const addCommentDislike: NonNullable<MutationResolvers['addCommentDislike']> = async (_, {commentId, userId}, {dataSources: {db}}) => {
    try {
        const dislike = await db.dislike.create({
            data: {
                commentId,
                userId
            }
        });

        return dislike;
    } catch {
        throw new Error('Dislike has not been added');
    }
}


type DislikeMutations = WithRequired<MutationResolvers, 'deleteArticleDislike' | 'deleteCommentDislike'>

export const dislikeMutations: DislikeMutations = {
    deleteArticleDislike,
    deleteCommentDislike, 
}