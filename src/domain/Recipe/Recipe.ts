import { AddRecipeDTO } from "@infra/http/dtos/Recipe/addRecipe.dto";
import { User } from "../User/User";
import { Comment } from "./../Comment/Comments";
import { Favorite } from "@domain/Favorite/Favorite";

export class Recipe {
  id: string;
  title: string;
  description: string;
  ingredients: string[];
  steps: string[];
  author: User;
  createdAt: Date;
  updatedAt: Date;
  favorites: Favorite[];
  comments: Comment[];

  constructor(data: AddRecipeDTO) {
    this.id = generateRecipeId();
    this.title = data.title;
    this.description = data.description;
    this.ingredients = data.ingredients;
    this.steps = data.steps;
    this.author = data.author;
    this.createdAt = new Date();
    this.updatedAt = new Date();
    this.favorites = [];
    this.comments = [];
  }
}

function generateRecipeId(): string {
  return `${Number(new Date())}`;
}
