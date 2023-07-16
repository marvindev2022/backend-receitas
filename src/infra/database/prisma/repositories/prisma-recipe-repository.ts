import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma.service";
import { Recipe } from "@domainRecipe/Recipe";
import { Comment } from "@domainComment/Comments";
import { EditCommentDTO } from "@infra/http/dtos/Comment/editComment.dto";
import { EditRecipeDTO } from "@infra/http/dtos/Recipe/editRecipe.dto";
import { NotFoundException } from "@nestjs/common";
import { AddRecipeDTO } from "@infra/http/dtos/Recipe/addRecipe.dto";
import { AddCommentDTO } from "@infra/http/dtos/Comment/addComment.dto";

@Injectable()
export class RecipesPrismaRepository {
  constructor(private prismaService: PrismaService) {}

  async addRecipe(userId: string, recipe: AddRecipeDTO): Promise<void> {
    const user = await this.prismaService.users.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new NotFoundException("User not found");
    }

    await this.prismaService.recipe.create({
      data: {
        title: recipe.title,
        description: recipe.description,
        ingredients: recipe.ingredients,
        steps: recipe.steps,
        author: { connect: { id: userId } },
      },
    });
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
      throw new NotFoundException("User not found");
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
      throw new NotFoundException("User not found");
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
      throw new NotFoundException("Author not found");
    }

    const recipeData: {
      id: string;
      title: string;
      description: string;
      ingredients: string[];
      steps: string[];
      author: string;
    } = {
      id: recipe.id,
      title: recipe.title,
      description: recipe.description,
      ingredients: recipe.ingredients,
      steps: recipe.steps,
      author: author.id,
    };

    return new Recipe(recipeData);
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
      throw new NotFoundException("User not found");
    }

    const recipe = await this.prismaService.recipe.findUnique({
      where: { id: recipeId },
    });

    if (!recipe) {
      throw new NotFoundException("Recipe not found");
    }

    await this.prismaService.comment.create({
      data: {
        text: comment.props.text,
        user: { connect: { id: user.id } },
        recipe: { connect: { id: recipe.id } },
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
      throw new NotFoundException("User not found");
    }

    const comment = await this.prismaService.comment.findUnique({
      where: { id: commentId },
    });

    if (!comment) {
      throw new NotFoundException("Comment not found");
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
      throw new NotFoundException("User not found");
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
      throw new NotFoundException("User not found");
    }

    const recipe = await this.prismaService.recipe.findUnique({
      where: { id: comment.recipeId },
    });

    if (!recipe) {
      throw new NotFoundException("Recipe not found");
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
