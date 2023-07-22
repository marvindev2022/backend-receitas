import { Injectable } from "@nestjs/common";
import { Recipe } from "@domainRecipe/Recipe";
import { Comment } from "@domainComment/Comments";
import { EditCommentDTO } from "@infra/http/dtos/Comment/editComment.dto";
import { EditRecipeDTO } from "@infra/http/dtos/Recipe/editRecipe.dto";
import { AddCommentDTO } from "@infra/http/dtos/Comment/addComment.dto";

@Injectable()
export abstract class RecipeRepository {
  protected recipes: Recipe[] = [];
  protected comments: Comment[] = [];
  protected users: any;

  abstract addRecipe(userId: string, recipe: Recipe): Promise<void>;

  abstract editRecipe(
    userId: string,
    recipeId: string,
    newData: EditRecipeDTO
  ): Promise<void>;

  abstract deleteRecipe(userId: string, recipeId: string): Promise<void>;

  abstract findRecipeById(userId:string,recipeId: string): Promise<Recipe | Error>;

  abstract addComment(
    userId: string,
    recipeId: string,
    comment: AddCommentDTO
  ): Promise<void>;

  abstract editComment(
    userId: string,
    recipeId: string,
    commentId: string,
    newData: EditCommentDTO
  ): Promise<void>;

  abstract deleteComment(
    userId: string,
    recipeId: string,
    commentId: string
  ): Promise<void>;

  abstract findCommentById(commentId: string): Promise<Comment | Error>;

  abstract findAllRecipes(): Promise<Recipe[]>;

}
