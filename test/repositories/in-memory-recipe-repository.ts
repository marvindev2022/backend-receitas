import { RecipeRepository } from "@app/repositories/Recipe/recipe";
import { Recipe } from "@domainRecipe/Recipe";
import { Comment } from "@domainComment/Comments";
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
    recipe: Recipe,
    updatedRecipe: Partial<Recipe>
  ): Promise<void> {
    Object.assign(recipe, updatedRecipe);
  }

  async deleteRecipe(recipe: Recipe): Promise<void> {
    const index = this.recipes.findIndex((r) => r.id === recipe.id);
    if (index !== -1) {
      this.recipes.splice(index, 1);
    }
  }

  async addComment(recipe: Recipe, comment: Comment): Promise<void> {
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
    comment: Comment,
    updatedComment: Partial<Comment>
  ): Promise<void> {
    Object.assign(comment, updatedComment);
  }

  async deleteComment(comment: Comment): Promise<void> {
    for (const recipe of this.recipes) {
      const index = recipe.comments.findIndex((c) => c.id === comment.id);
      if (index !== -1) {
        recipe.comments.splice(index, 1);
        break;
      }
    }
  }
}
