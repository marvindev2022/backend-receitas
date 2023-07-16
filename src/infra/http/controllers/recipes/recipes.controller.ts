import { Body, Controller, Delete, Param, Post, Put } from "@nestjs/common";
import { RecipeService } from "@infra/http/services/Recipe/recipes.service";
import { AddRecipeDTO } from "@infra/http/dtos/Recipe/addRecipe.dto";
import { EditRecipeDTO } from "@infra/http/dtos/Recipe/editRecipe.dto";
import { AddCommentDTO } from "@infra/http/dtos/Comment/addComment.dto";
import { EditCommentDTO } from "@infra/http/dtos/Comment/editComment.dto";

@Controller("recipes")
export class RecipesController {
  constructor(private recipeService: RecipeService) {}

  @Post(":userId")
  async addRecipe(
    @Param("id") userId: string,
    @Body() addRecipeDTO: AddRecipeDTO
  ) {
    const recipe = await this.recipeService.addRecipe(userId, addRecipeDTO);

    return recipe;
  }

  @Put(":userId/recipe/:recipeId")
  async editRecipe(
    @Param("id") userId: string,
    @Param("recipeId") recipeId: string,
    @Body() editRecipeDTO: EditRecipeDTO
  ) {
    await this.recipeService.editRecipe(userId, recipeId, editRecipeDTO);
  }

  @Delete(":userId/recipe/:recipeId")
  async deleteRecipe(
    @Param("id") userId: string,
    @Param("recipeId") recipeId: string
  ) {
    await this.recipeService.deleteRecipe(userId, recipeId);
  }

  @Post(":userId/recipe/:recipeId/comments")
  async addComment(
    @Param("id") userId: string,
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
    @Param("id") userId: string,
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
    @Param("id") userId: string,
    @Param("recipeId") recipeId: string,
    @Param("commentId") commentId: string
  ) {
    await this.recipeService.deleteComment(userId, recipeId, commentId);
  }

  // @Post(":userId/recipe/:recipeId/favorite")
  // async favoriteRecipe(
  //   @Param("id") userId: string,
  //   @Param("recipeId") recipeId: string
  // ) {
  //   await this.recipeService.favoriteRecipe(userId, recipeId);
  // }

  // @Delete(":userId/recipe/:recipeId/favorite")
  // async unfavoriteRecipe(
  //   @Param("id") userId: string,
  //   @Param("recipeId") recipeId: string
  // ) {
  //   await this.recipeService.unfavoriteRecipe(userId, recipeId);
  // }
}
