import { InvalidParamError } from "@app/errors/InvalidParamError";
import { MissingParamError } from "@app/errors/MissingParamError";
import { makeHash } from "@app/protocols/crypto/hash/makeHash";
import { z } from "zod";

interface UserCreationProps {
  id?: string;
  name: string;
  email: string;
  password: string;
  favoriteRecipes?: string[];
}

interface NewUser {
  body: UserCreationProps;
  statusCode: number;
}

interface IsValidMethodReturn {
  isValid: boolean;
  body: any;
  statusCode: number;
}

export class User {
  props: UserCreationProps;

  constructor(props: UserCreationProps) {
    const newUser = this.handle(props);

    if (newUser.statusCode >= 300) {
      throw newUser.body;
    }

    this.props = {
      ...newUser.body,
      password: makeHash(newUser.body.password),
    };
  }

  private handle(props: UserCreationProps): NewUser {
    const { isValid, body, statusCode } = this.isValid(props);

    if (!isValid) {
      return {
        body: body,
        statusCode: statusCode,
      };
    }

    return {
      body: props,
      statusCode: 200,
    };
  }

  private isValid(params: UserCreationProps): IsValidMethodReturn {
    const userSchema = z.object({
      name: z.string().min(3, { message: "Invalid" }),
      email: z.string().email().min(6, { message: "Invalid" }),
      password: z.string().min(6, { message: "Invalid" }),
      favoriteRecipes: z.array(z.string()), // Validação do array de IDs de receitas favoritas
    });

    const userIsValid = userSchema.safeParse(params);

    if (!userIsValid.success) {
      const errorPath = userIsValid.error.errors[0].path[0].toString();
      const errorMessage = userIsValid.error.errors[0].message;
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

  addFavoriteRecipe(recipeId: string): void {
    if (!this.props.favoriteRecipes) {
      this.props.favoriteRecipes = [];
    }

    if (!this.props.favoriteRecipes.includes(recipeId)) {
      this.props.favoriteRecipes.push(recipeId);
    }
  }

  removeFavoriteRecipe(recipeId: string): void {
    if (this.props.favoriteRecipes) {
      const index = this.props.favoriteRecipes.indexOf(recipeId);
      if (index !== -1) {
        this.props.favoriteRecipes.splice(index, 1);
      }
    }
  }
}
