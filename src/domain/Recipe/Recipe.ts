import { AddRecipeDTO } from "@infra/http/dtos/Recipe/addRecipe.dto";
import { Comment } from "../Comment/Comments";
import { Favorite } from "../Favorite/Favorite";
import { InvalidParamError } from "@app/errors/InvalidParamError";
import { MissingParamError } from "@app/errors/MissingParamError";
import { z } from "zod";

export interface RecipeProps {
  id?: string;
  title: string;
  description: string;
  ingredients: string[];
  steps: string[];
  author?: string;
  createdAt?: Date;
  updatedAt?: Date;
  favorites?: Favorite[];
  comments?: Comment[];
}

interface NewRecipe {
  body: RecipeProps;
  statusCode: number;
}

interface IsValidMethodReturn {
  isValid: boolean;
  body: any;
  statusCode: number;
}

export class Recipe {
  props: RecipeProps;
  comments: any;

  constructor(data: AddRecipeDTO, author: string) {
    const newRecipe = this.handle(data);

    if (newRecipe.statusCode >= 300) {
      throw newRecipe.body;
    }

    this.props = {
      ...newRecipe.body,
      id: generateRecipeId(),
      createdAt: new Date(),
      updatedAt: new Date(),
      favorites: [],
      comments: [],
      author: author,
    };
  }

  private handle(data: AddRecipeDTO): NewRecipe {
    const { isValid, body, statusCode } = this.isValid(data);

    if (!isValid) {
      return {
        body: body,
        statusCode: statusCode,
      };
    }

    return {
      body: data,
      statusCode: 200,
    };
  }

  private isValid(data: AddRecipeDTO): IsValidMethodReturn {
    const recipeSchema = z.object({
      title: z.string().min(3, { message: "Invalid" }),
      description: z.string().min(6, { message: "Invalid" }),
      ingredients: z.array(z.string()),
      steps: z.array(z.string()),
      
    });

    const recipeIsValid = recipeSchema.safeParse(data);

    if (!recipeIsValid.success) {
      const errorPath = recipeIsValid.error.errors[0].path[0].toString();
      const errorMessage = recipeIsValid.error.errors[0].message;
      const errorBody =
        errorMessage === "Invalid"
          ? new InvalidParamError(errorPath)
          : new MissingParamError(errorPath);

      return {
        isValid: false,
        body: errorBody,
        statusCode: 400,
      };
    }

    return {
      isValid: true,
      body: null,
      statusCode: 200,
    };
  }

  addFavorite(favorite: Favorite): void {
    if (!this.props.favorites) {
      this.props.favorites = [];
    }

    this.props.favorites.push(favorite);
  }

  removeFavorite(favorite: Favorite): void {
    if (this.props.favorites) {
      const index = this.props.favorites.indexOf(favorite);
      if (index !== -1) {
        this.props.favorites.splice(index, 1);
      }
    }
  }
}

function generateRecipeId(): string {
  return `${Number(new Date())}`;
}
