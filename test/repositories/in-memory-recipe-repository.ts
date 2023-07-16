import { RecipeRepository } from "@app/repositories/Recipe/recipe";
import { Recipe } from "@domain/Recipe/Recipe";
import { Comment } from "@domain/Comment/Comments";
import { NotFoundException } from "@nestjs/common";

export class InMemoryRecipeRepository implements RecipeRepository {
  private recipes: Recipe[] = [];

  async addRecipe(recipe: Recipe): Promise<void> {
    this.recipes.push(recipe);
  }

  async findRecipeById(recipeId: string): Promise<Recipe | undefined> {
    return this.recipes.find((recipe) => recipe.id === recipeId);
  }

  async editRecipe(
    recipeId: string,
    updatedRecipe: Partial<Recipe>
  ): Promise<void> {
    const recipe = await this.findRecipeById(recipeId);
    if (!recipe) {
      throw new NotFoundException("Recipe not found");
    }
    Object.assign(recipe, updatedRecipe);
  }

  async deleteRecipe(recipeId: string): Promise<void> {
    const index = this.recipes.findIndex((recipe) => recipe.id === recipeId);
    if (index !== -1) {
      this.recipes.splice(index, 1);
    }
  }

  async addComment(recipeId: string, comment: Comment): Promise<void> {
    const recipe = await this.findRecipeById(recipeId);
    if (!recipe) {
      throw new NotFoundException("Recipe not found");
    }
    recipe.comments.push(comment);
  }

  async findCommentById(commentId: string): Promise<Comment | undefined> {
    for (const recipe of this.recipes) {
      const comment = recipe.comments.find((c) => c.id === commentId);
      if (comment) {
        return comment;
      }
    }
    return undefined;
  }

  async editComment(
    commentId: string,
    updatedComment: Partial<Comment>
  ): Promise<void> {
    const comment = await this.findCommentById(commentId);
    if (!comment) {
      throw new NotFoundException("Comment not found");
    }
    Object.assign(comment, updatedComment);
  }

  async deleteComment(commentId: string): Promise<void> {
    for (const recipe of this.recipes) {
      const index = recipe.comments.findIndex((c) => c.id === commentId);
      if (index !== -1) {
        recipe.comments.splice(index, 1);
        break;
      }
    }
  }
}
