import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { UserRepository } from "@app/repositories/User/user";
import { User } from "@domain/User/User";
import { InvalidParamError } from "@app/errors/InvalidParamError";
import { UserLoginDTO } from "@infra/http/dtos/User/login.dto";
import { EditUserDTO } from "@infra/http/dtos/User/editUser.dto";
import { RegisterUserDTO } from "@infra/http/dtos/User/registerUser.dto";
import { EmailValidationResponseDTO } from "@infra/http/dtos/User/emailValidationResponse.dto";
import { z } from "zod";
import { RecipeRepository } from "@app/repositories/Recipe/recipe";
import { Recipe } from "@domain/Recipe/Recipe";
import { Comment } from "@domain/Comment/Comments";
import { AddRecipeDTO } from "@infra/http/dtos/Recipe/addRecipe.dto";
import { EditRecipeDTO } from "@infra/http/dtos/Recipe/editRecipe.dto";
import { AddCommentDTO } from "@infra/http/dtos/Comment/addComment.dto";
import { EditCommentDTO } from "@infra/http/dtos/Comment/editComment.dto";

@Injectable()
export class UserService {
  constructor(
    private userRepository: UserRepository,
    private recipeRepository: RecipeRepository
  ) {}

  async register(request: RegisterUserDTO): Promise<User | Error> {
    const newUser = new User(request);

    await this.userRepository.register(newUser);
    return newUser;
  }

  async login(request: UserLoginDTO): Promise<string> {
    const requestSchema = z.object({
      email: z.string().email().min(6, { message: "Invalid" }),
      password: z.string(),
    });

    const loginProps = requestSchema.safeParse(request);

    if (!loginProps.success) {
      throw new BadRequestException("Erro ao realizar login", {
        cause: new BadRequestException(),
        description: loginProps.error.errors[0].message,
      });
    }

    const userLoginResponse = await this.userRepository.login(loginProps.data);

    if (userLoginResponse instanceof Error) {
      throw userLoginResponse;
    }

    return userLoginResponse;
  }

  async edit(userId: string, request: EditUserDTO): Promise<void | Error> {
    if (!userId) {
      throw new BadRequestException("Identificação de usuário inválida");
    }

    const editionGoneWrong = await this.userRepository.edit(userId, request);

    if (editionGoneWrong instanceof Error) {
      throw editionGoneWrong;
    }
  }

  async validateEmail(email: string): Promise<EmailValidationResponseDTO> {
    const bodySchema = z.string().email({ message: "E-mail" });
    const sendedEmail = bodySchema.safeParse(email);

    if (!sendedEmail.success) {
      throw new InvalidParamError(sendedEmail.error.message);
    }

    const emailIsValid = await this.userRepository.findByEmail(
      sendedEmail.data
    );

    if (emailIsValid instanceof NotFoundException) {
      return {
        isAvailable: true,
        message: "Nenhum usuário está cadastrado com este e-mail",
      };
    }

    return {
      isAvailable: false,
      message: "Já existe um usuário cadastrado com este e-mail",
    };
  }

  async addRecipe(
    userId: string,
    request: AddRecipeDTO
  ): Promise<Recipe | Error> {
    const user = await this.userRepository.findUserById(userId);
    if (!user) {
      throw new NotFoundException("Usuário não encontrado");
    }

    const newRecipe = new Recipe(request);
    newRecipe.author = user;

    await this.recipeRepository.addRecipe(userId,newRecipe);

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

    await this.recipeRepository.editRecipe(userId, recipe.id, request);
  }

  async deleteRecipe(userId: string, recipeId: string): Promise<void | Error> {
    const recipe = await this.recipeRepository.findRecipeById(recipeId);
    if (!recipe) {
      throw new NotFoundException("Receita não encontrada");
    }

    await this.recipeRepository.deleteRecipe(userId, recipe.id);
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

    const user = await this.userRepository.findUserById(request.id);
    if (!user) {
      throw new NotFoundException("Usuário não encontrado");
    }

    const newComment = new Comment(request);
    newComment.recipe = recipe;
    newComment.user = user;

    await this.recipeRepository.addComment(userId, recipe.id, newComment);

    return newComment;
  }

  async editComment(
    userId: string,
    recipeId:string,
    commentId: string,
    request: EditCommentDTO
  ): Promise<void | Error> {
    const comment = await this.recipeRepository.findCommentById(commentId);
    if (!comment) {
      throw new NotFoundException("Comentário não encontrado");
    }

    await this.recipeRepository.editComment(userId, recipeId,comment.id, request);
  }

  async deleteComment(
    userId: string,
    recipeId:string,
    commentId: string
  ): Promise<void | Error> {
    const comment = await this.recipeRepository.findCommentById(commentId);
    if (!comment) {
      throw new NotFoundException("Comentário não encontrado");
    }

    await this.recipeRepository.deleteComment(userId,recipeId ,comment.id);
  }

  async favoriteRecipe(
    userId: string,
    recipeId: string
  ): Promise<void | Error> {
    const user = await this.userRepository.findUserById(userId);
    if (!user) {
      throw new NotFoundException("Usuário não encontrado");
    }

    const recipe = await this.recipeRepository.findRecipeById(recipeId);
    if (!recipe) {
      throw new NotFoundException("Receita não encontrada");
    }

    if (!this.userRepository.favoriteRecipe) {
      throw new Error(
        "A propriedade 'favoriteRecipe' não existe no tipo 'UserRepository'."
      );
    }

    await this.userRepository.favoriteRecipe(user, recipe);
  }

  async unfavoriteRecipe(
    userId: string,
    recipeId: string
  ): Promise<void | Error> {
    const user = await this.userRepository.findUserById(userId);
    if (!user) {
      throw new NotFoundException("Usuário não encontrado");
    }

    const recipe = await this.recipeRepository.findRecipeById(recipeId);
    if (!recipe) {
      throw new NotFoundException("Receita não encontrada");
    }

    if (!this.userRepository.unfavoriteRecipe) {
      throw new Error(
        "A propriedade 'unfavoriteRecipe' não existe no tipo 'UserRepository'."
      );
    }

    await this.userRepository.unfavoriteRecipe(user, recipe);
  }
}
