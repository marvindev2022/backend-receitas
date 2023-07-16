import { User } from "../User/User";
import { Recipe } from "../Recipe/Recipe";

export class Favorite {
  private user: User;
  private recipe: Recipe;

  constructor(user: User, recipe: Recipe) {
    this.user = user;
    this.recipe = recipe;
  }

  getUser(): User {
    return this.user;
  }

  getRecipe(): Recipe {
    return this.recipe;
  }
}
