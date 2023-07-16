import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { RecipeRepository } from "@app/repositories/Recipe/recipe";
import { Recipe } from "@domainRecipe/Recipe";
import { Comment } from "@domainComment/Comments";
import { AddRecipeDTO } from "@infra/http/dtos/Recipe/addRecipe.dto";
import { EditRecipeDTO } from "@infra/http/dtos/Recipe/editRecipe.dto";
import { AddCommentDTO } from "@infra/http/dtos/Comment/addComment.dto";
import { EditCommentDTO } from "@infra/http/dtos/Comment/editComment.dto";

@Injectable()
export class RecipeService {
  constructor(private recipeRepository: RecipeRepository) {}

  async addRecipe(
    userId: string,
    request: AddRecipeDTO
  ): Promise<Recipe | Error> {
    const newRecipe = new Recipe(request);

    await this.recipeRepository.addRecipe(userId, newRecipe);

    return newRecipe;
  }

  async editRecipe(
    userId: string,
    recipeId: string,
    request: EditRecipeDTO
  ): Promise<void | Error> {
    const recipe = await this.recipeRepository.findRecipeById(recipeId);
    if (!recipe) {
      throw new NotFoundException("Receita não encontrada");
    }

    await this.recipeRepository.editRecipe(userId, recipeId, request);
  }

  async deleteRecipe(userId: string, recipeId: string): Promise<void | Error> {
    const recipe = await this.recipeRepository.findRecipeById(recipeId);
    if (!recipe) {
      throw new NotFoundException("Receita não encontrada");
    }

    await this.recipeRepository.deleteRecipe(userId, recipeId);
  }

  async addComment(
    userId: string,
    recipeId: string,
    request: AddCommentDTO
  ): Promise<Comment | Error> {
    const recipe = await this.recipeRepository.findRecipeById(recipeId);
    if (!recipe) {
      throw new NotFoundException("Receita não encontrada");
    }

    const newCommentData: AddCommentDTO = {
      text: request.text,
      user: userId,
      recipe: recipeId,
    };

    await this.recipeRepository.addComment(userId, recipeId, newCommentData);

    const newComment = new Comment(newCommentData);

    return newComment;
  }

  async editComment(
    userId: string,
    recipeId: string,
    commentId: string,
    request: EditCommentDTO
  ): Promise<void | Error> {
    const comment = await this.recipeRepository.findCommentById(commentId);
    if (!comment) {
      throw new NotFoundException("Comentário não encontrado");
    }

    await this.recipeRepository.editComment(
      userId,
      recipeId,
      commentId,
      request
    );
  }

  async deleteComment(
    userId: string,
    recipeId: string,
    commentId: string
  ): Promise<void | Error> {
    const comment = await this.recipeRepository.findCommentById(commentId);
    if (!comment) {
      throw new NotFoundException("Comentário não encontrado");
    }

    await this.recipeRepository.deleteComment(userId, recipeId, commentId);
  }

  // async favoriteRecipe(
  //   userId: string,
  //   recipeId: string
  // ): Promise<void | Error> {

  //   const recipe = await this.recipeRepository.findRecipeById(recipeId);
  //   if (!recipe) {
  //     throw new NotFoundException("Receita não encontrada");
  //   }

  //   if (!this.recipeRepository.favoriteRecipe) {
  //     throw new Error(
  //       "A propriedade 'favoriteRecipe' não existe no tipo 'UserRepository'."
  //     );
  //   }

  //   await this.recipeRepository.favoriteRecipe(userId, recipe);
  // }

  // async unfavoriteRecipe(
  //   userId: string,
  //   recipeId: string
  // ): Promise<void | Error> {

  //   const recipe = await this.recipeRepository.findRecipeById(recipeId);
  //   if (!recipe) {
  //     throw new NotFoundException("Receita não encontrada");
  //   }

  //   if (!this.recipeRepository.unfavoriteRecipe) {
  //     throw new Error(
  //       "A propriedade 'unfavoriteRecipe' não existe no tipo 'UserRepository'."
  //     );
  //   }

  //   await this.recipeRepository.unfavoriteRecipe(user, recipe);
  // }
}
