import { Injectable } from "@nestjs/common";
import { Recipe } from "@domain/Recipe/Recipe";
import { Comment } from "@domain/Comment/Comments";
import { EditCommentDTO } from "@infra/http/dtos/Comment/editComment.dto";
import { EditRecipeDTO } from "@infra/http/dtos/Recipe/editRecipe.dto";

@Injectable()
export class RecipeRepository {
  private recipes: Recipe[] = [];
  private comments: Comment[] = [];
  users: any;

  async addRecipe(userId: string, recipe: Recipe): Promise<void> {
    const user = this.users.find((u) => u.id === userId);
    if (user) {
      recipe.author = user;
      this.recipes.push(recipe);
    }
  }

  async editRecipe(
    userId: string,
    recipeId: string,
    newData: EditRecipeDTO
  ): Promise<void> {
    const recipe = this.recipes.find((r) => r.id === recipeId);
    if (recipe && recipe.author.props.id === userId) {
      Object.assign(recipe, newData);
    }
  }

  async deleteRecipe(userId: string, recipeId: string): Promise<void> {
    const index = this.recipes.findIndex((r) => r.id === recipeId);
    if (index !== -1 && this.recipes[index].author.props.id === userId) {
      this.recipes.splice(index, 1);
    }
  }

  async findRecipeById(recipeId: string): Promise<Recipe | undefined> {
    return this.recipes.find((recipe) => recipe.id === recipeId);
  }

  async addComment(
    userId: string,
    recipeId: string,
    comment: Comment
  ): Promise<void> {
    const recipe = this.recipes.find((r) => r.id === recipeId);
    if (recipe) {
      this.comments.push(comment);
      recipe.comments.push(comment);
    }
  }

  async editComment(
    userId: string,
    recipeId:string,
    commentId: string,
    newData: EditCommentDTO
  ): Promise<void> {
    const comment = this.comments.find((c) => c.id === commentId && c.recipe.id === recipeId);
    if (comment && comment.user.props.id === userId) {
      Object.assign(comment, newData);
    }
  }

  async deleteComment(userId: string, recipeId:string,commentId: string): Promise<void> {
    const index = this.comments.findIndex((c) => c.id === commentId && c.recipe.id === recipeId);
    if (index !== -1 && this.comments[index].user.props.id === userId) {
      this.comments.splice(index, 1);
    }
    const recipe = this.recipes.find((recipe) =>
      recipe.comments.some((c) => c.id === commentId)
    );
    if (recipe) {
      const commentIndex = recipe.comments.findIndex((c) => c.id === commentId);
      if (
        commentIndex !== -1 &&
        recipe.comments[commentIndex].user.props.id === userId
      ) {
        recipe.comments.splice(commentIndex, 1);
      }
    }
  }

  async findCommentById(commentId: string): Promise<Comment | undefined> {
    return this.comments.find((comment) => comment.id === commentId);
  }
}
