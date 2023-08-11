import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from "@nestjs/common";
import { RecipeService } from "@infra/http/services/Recipe/recipes.service";
import { AddRecipeDTO } from "@infra/http/dtos/Recipe/addRecipe.dto";
import { EditRecipeDTO } from "@infra/http/dtos/Recipe/editRecipe.dto";
import { AddCommentDTO } from "@infra/http/dtos/Comment/addComment.dto";
import { EditCommentDTO } from "@infra/http/dtos/Comment/editComment.dto";
import { Recipe } from "@prisma/client";

@Controller("recipes")
export class RecipesController {
  constructor(private recipeService: RecipeService) {}

  @Post(":userId")
  async addRecipe(
    @Param("userId") userId: string,
    @Body() addRecipeDTO: Recipe
  ) {
    const recipe = await this.recipeService.addRecipe(userId, addRecipeDTO);

    return recipe;
  }

  @Put(":userId/recipe/:recipeId")
  async editRecipe(
    @Param("userId") userId: string,
    @Param("recipeId") recipeId: string,
    @Body() editRecipeDTO: EditRecipeDTO
  ) {
    await this.recipeService.editRecipe(userId, recipeId, editRecipeDTO);
  }

  @Delete(":userId/recipe/:recipeId")
  async deleteRecipe(
    @Param("userId") userId: string,
    @Param("recipeId") recipeId: string
  ) {
    await this.recipeService.deleteRecipe(userId, recipeId);
  }

  @Post(":userId/recipe/:recipeId/comments")
  async addComment(
    @Param("userId") userId: string,
    @Param("recipeId") recipeId: string,
    @Body() addCommentDTO: AddCommentDTO
  ) {
    const comment = await this.recipeService.addComment(
      userId,
      recipeId,
      addCommentDTO
    );
    return comment;
  }

  @Put(":userId/recipe/:recipeId/comments/:commentId")
  async editComment(
    @Param("userId") userId: string,
    @Param("recipeId") recipeId: string,
    @Param("commentId") commentId: string,
    @Body() editCommentDTO: EditCommentDTO
  ) {
    await this.recipeService.editComment(
      userId,
      recipeId,
      commentId,
      editCommentDTO
    );
  }

  @Delete(":userId/recipe/:recipeId/comments/:commentId")
  async deleteComment(
    @Param("userId") userId: string,
    @Param("recipeId") recipeId: string,
    @Param("commentId") commentId: string
  ) {
    await this.recipeService.deleteComment(userId, recipeId, commentId);
  }

  @Get("all")
  async getAllRecipes(): Promise<any> {
    try {
      const recipesData = await this.recipeService.findAllRecipes();
      return recipesData;
    } catch (error) {
      console.log(error);
    }
  }
}
