import { MutationResolvers } from "../../types";
import { WithRequired } from "../../utils/mapped-type";
import { createArticle } from "./createArticle.js";

type ArticleMutations = WithRequired<MutationResolvers, 'createArticle'>

export const articleMutations: ArticleMutations = {
  createArticle,
}