import { RecipeRepository } from "@app/repositories/Recipe/recipe";
import { Recipe } from "@domain/Recipe/Recipe";
import { Comment } from "@domain/Comment/Comments";
import { NotFoundException } from "@nestjs/common";
import { EditRecipeDTO } from "@infra/http/dtos/Recipe/editRecipe.dto";
import { AddCommentDTO } from "@infra/http/dtos/Comment/addComment.dto";
import { EditCommentDTO } from "@infra/http/dtos/Comment/editComment.dto";

export class InMemoryRecipeRepository extends RecipeRepository {
  public recipes: Recipe[] = [];
  async addRecipe(userId: string, recipe: Recipe): Promise<void> {
    const newRecipe = new Recipe(recipe, userId);
    this.recipes.push(newRecipe);
  }

  async findRecipeById(recipeId: string): Promise<Recipe | undefined> {
    return this.recipes.find((recipe) => recipe.props.id === recipeId);
  }

  async editRecipe(
    userId: string,
    recipeId: string,
    newData: EditRecipeDTO
  ): Promise<void> {
    const recipe = await this.findRecipeById(recipeId);
    if (!recipe) {
      throw new NotFoundException("Recipe not found");
    }
    if (recipe.props.author !== userId) {
      throw new NotFoundException("Unauthorized");
    }
    Object.assign(recipe.props, newData);
  }

  async deleteRecipe(userId: string, recipeId: string): Promise<void> {
    const index = this.recipes.findIndex(
      (recipe) => recipe.props.id === recipeId
    );
    if (index === -1) {
      throw new NotFoundException("Recipe not found");
    }
    if (this.recipes[index].props.author !== userId) {
      throw new NotFoundException("Unauthorized");
    }
    this.recipes.splice(index, 1);
  }

  async addComment(
    userId: string,
    recipeId: string,
    comment: AddCommentDTO
  ): Promise<void> {
    const recipe = await this.findRecipeById(recipeId);
    if (!recipe) {
      throw new NotFoundException("Recipe not found");
    }
    const newComment = new Comment(comment)
    recipe.comments.push(newComment);
  }

  async findCommentById(commentId: string): Promise<Comment | undefined> {
    for (const recipe of this.recipes) {
      for (const comment of recipe.comments) {
        if (comment.id === commentId) {
          return comment;
        }
      }
    }
    return undefined;
  }

  async editComment(
    userId: string,
    recipeId: string,
    commentId: string,
    newData: EditCommentDTO
  ): Promise<void> {
    for (const recipe of this.recipes) {
      for (const comment of recipe.comments) {
        if (comment.id === commentId) {
          if (comment.author !== userId) {
            throw new NotFoundException("Unauthorized");
          }
          Object.assign(comment, newData);
          return;
        }
      }
    }
    throw new NotFoundException("Comment not found");
  }

  async deleteComment(
    userId: string,
    recipeId: string,
    commentId: string
  ): Promise<void> {
    for (const recipe of this.recipes) {
      const index = recipe.comments.findIndex(
        (comment) => comment.id === commentId
      );
      if (index !== -1) {
        if (recipe.comments[index].author !== userId) {
          throw new NotFoundException("Unauthorized");
        }
        recipe.comments.splice(index, 1);
        return;
      }
    }
    throw new NotFoundException("Comment not found");
  }
}
