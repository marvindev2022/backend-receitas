import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  NotFoundException,
  Param,
  Patch,
  Post,
  Put,
} from "@nestjs/common";
import { RegisterUserDTO } from "@infra/http/dtos/User/registerUser.dto";
import { UserService } from "@infra/http/services/users/users.service";
import { UserLoginDTO } from "@infra/http/dtos/User/login.dto";
import { EditUserDTO } from "@infra/http/dtos/User/editUser.dto";
import { AddRecipeDTO } from "@infra/http/dtos/Recipe/addRecipe.dto";
import { EditRecipeDTO } from "@infra/http/dtos/Recipe/editRecipe.dto";
import { AddCommentDTO } from "@infra/http/dtos/Comment/addComment.dto";
import { EditCommentDTO } from "@infra/http/dtos/Comment/editComment.dto";

@Controller("users")
export class UsersController {
  constructor(private userService: UserService) {}

  @Post("signup")
  async register(@Body() registerUserDTO: RegisterUserDTO) {
    const id = await this.userService.register(registerUserDTO);

    if (id instanceof Error) {
      throw new BadRequestException(id.message);
    }

    return { message: "Usuário cadastrado com sucesso!" };
  }

  @Post("signin")
  async login(@Body() userLoginDTO: UserLoginDTO) {
    const token = await this.userService.login(userLoginDTO);

    return token;
  }

  @Post("validate/email")
  @HttpCode(200)
  async validateEmail(@Body() { email }: { email: string }) {
    if (!email) {
      throw new BadRequestException("E-mail inválido");
    }

    const emailValidationResponse = await this.userService.validateEmail(email);

    return emailValidationResponse;
  }

  @Put(":id")
  async edit(@Param("id") id: string, @Body() editUserDTO: EditUserDTO) {
    await this.userService.edit(id, editUserDTO);
  }

  @Post(":id/recipes")
  async addRecipe(
    @Param("id") userId: string,
    @Body() addRecipeDTO: AddRecipeDTO
  ) {
    const recipe = await this.userService.addRecipe(userId, addRecipeDTO);

    return recipe;
  }

  @Put(":userId/recipes/:recipeId")
  async editRecipe(
    @Param("userId") userId: string,
    @Param("recipeId") recipeId: string,
    @Body() editRecipeDTO: EditRecipeDTO
  ) {
    await this.userService.editRecipe(userId, recipeId, editRecipeDTO);
  }

  @Delete(":userId/recipes/:recipeId")
  async deleteRecipe(
    @Param("userId") userId: string,
    @Param("recipeId") recipeId: string
  ) {
    await this.userService.deleteRecipe(userId, recipeId);
  }

  @Post(":userId/recipes/:recipeId/comments")
  async addComment(
    @Param("userId") userId: string,
    @Param("recipeId") recipeId: string,
    @Body() addCommentDTO: AddCommentDTO
  ) {
    const comment = await this.userService.addComment(
      userId,
      recipeId,
      addCommentDTO
    );

    return comment;
  }

  @Put(":userId/recipes/:recipeId/comments/:commentId")
  async editComment(
    @Param("userId") userId: string,
    @Param("recipeId") recipeId: string,
    @Param("commentId") commentId: string,
    @Body() editCommentDTO: EditCommentDTO
  ) {
    await this.userService.editComment(
      userId,
      recipeId,
      commentId,
      editCommentDTO
    );
  }

  @Delete(":userId/recipes/:recipeId/comments/:commentId")
  async deleteComment(
    @Param("userId") userId: string,
    @Param("recipeId") recipeId: string,
    @Param("commentId") commentId: string
  ) {
    await this.userService.deleteComment(userId, recipeId, commentId);
  }

  @Post(":userId/recipes/:recipeId/favorite")
  async favoriteRecipe(
    @Param("userId") userId: string,
    @Param("recipeId") recipeId: string
  ) {
    await this.userService.favoriteRecipe(userId, recipeId);
  }

  @Delete(":userId/recipes/:recipeId/favorite")
  async unfavoriteRecipe(
    @Param("userId") userId: string,
    @Param("recipeId") recipeId: string
  ) {
    await this.userService.unfavoriteRecipe(userId, recipeId);
  }
}
