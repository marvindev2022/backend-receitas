import { BadRequestException, Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma.service";
import { Recipe } from "@domainRecipe/Recipe";
import { Comment } from "@domainComment/Comments";
import { EditCommentDTO } from "@infra/http/dtos/Comment/editComment.dto";
import { EditRecipeDTO } from "@infra/http/dtos/Recipe/editRecipe.dto";
import { AddCommentDTO } from "@infra/http/dtos/Comment/addComment.dto";

@Injectable()
export class PrismaRecipesRepository {
  constructor(private prismaService: PrismaService) {}

  async addRecipe(userId: string, recipe: Recipe): Promise<any> {
    try {
      const user = await this.prismaService.users.findUnique({
        where: { id: userId },
      });

      if (!user) {
        throw new BadRequestException("Usuário não encontrado!");
      }

      await this.prismaService.recipe.create({
        data: {
          title: recipe.props.title,
          description: recipe.props.description,
          ingredients: recipe.props.ingredients,
          steps: recipe.props.steps,
          author: { connect: { id: userId } },
        },
      });
    } catch (error) {
      console.error(error);
      throw new BadRequestException("Ocorreu um erro ao adicionar a receita.");
    }
  }

  async editRecipe(
    userId: string,
    recipeId: string,
    newData: EditRecipeDTO
  ): Promise<void> {
    const user = await this.prismaService.users.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new BadRequestException("Usuário não encontrado!");
    }

    await this.prismaService.recipe.update({
      where: { id: recipeId },
      data: {
        title: newData.title,
        description: newData.description,
      },
    });
  }

  async deleteRecipe(userId: string, recipeId: string): Promise<void> {
    const user = await this.prismaService.users.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new BadRequestException("User not found");
    }

    await this.prismaService.recipe.delete({
      where: { id: recipeId },
    });
  }

  async findRecipeById(recipeId: string): Promise<Recipe | undefined> {
    const recipe = await this.prismaService.recipe.findUnique({
      where: { id: recipeId },
    });

    if (!recipe) {
      return undefined;
    }

    const author = await this.prismaService.users.findUnique({
      where: { id: recipe.authorId },
    });

    if (!author) {
      throw new BadRequestException("Author not found");
    }

    const recipeData: {
      id: string;
      title: string;
      description: string;
      ingredients: string[];
      steps: string[];
    } = {
      id: String(recipe.id),
      title: recipe.title,
      description: recipe.description,
      ingredients: recipe.ingredients,
      steps: recipe.steps,
    };

    return new Recipe(recipeData, author.id);
  }

  async findAllRecipes(): Promise<any> {
    const recipes = await this.prismaService.recipe.findMany();
    return recipes;
  }

  async addComment(
    userId: string,
    recipeId: string,
    comment: Comment
  ): Promise<void> {
    const user = await this.prismaService.users.findUnique({
      where: { id: userId },
    });
    if (!user) {
      throw new BadRequestException("User not found");
    }

    const recipe = await this.prismaService.recipe.findUnique({
      where: { id: recipeId },
    });
    if (!recipe) {
      throw new BadRequestException("Recipe not found");
    }

    await this.prismaService.comment.create({
      data: {
        text: comment.props.text,
        user: { connect: { id: user.id } },
        recipe: { connect: { id: String(recipe.id) } },
      },
    });
  }

  async editComment(
    userId: string,
    recipeId: string,
    commentId: string,
    newData: EditCommentDTO
  ): Promise<void> {
    const user = await this.prismaService.users.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new BadRequestException("User not found");
    }

    const comment = await this.prismaService.comment.findUnique({
      where: { id: commentId },
    });

    if (!comment) {
      throw new BadRequestException("Comment not found");
    }

    await this.prismaService.comment.update({
      where: { id: commentId },
      data: {
        text: newData.text,
        user: { connect: { id: user.id } },
        recipe: { connect: { id: recipeId } },
      },
    });
  }

  async deleteComment(
    userId: string,
    recipeId: string,
    commentId: string
  ): Promise<void> {
    const user = await this.prismaService.users.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new BadRequestException("User not found");
    }

    await this.prismaService.comment.delete({
      where: { id: commentId },
    });
  }

  async findCommentById(commentId: string): Promise<Comment | undefined> {
    const comment = await this.prismaService.comment.findUnique({
      where: { id: commentId },
    });

    if (!comment) {
      return undefined;
    }

    const user = await this.prismaService.users.findUnique({
      where: { id: comment.userId },
    });

    if (!user) {
      throw new BadRequestException("User not found");
    }

    const recipe = await this.prismaService.recipe.findUnique({
      where: { id: String(comment.recipeId) },
    });

    if (!recipe) {
      throw new BadRequestException("Recipe not found");
    }

    const commentData: AddCommentDTO = {
      id: String(comment.id),
      text: comment.text,
      user: user.id,
      recipe: String(recipe.id),
    };

    return new Comment(commentData);
  }
}
