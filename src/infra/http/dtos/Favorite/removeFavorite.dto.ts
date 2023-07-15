import { User } from "../../../../domain/User/User";
import { Recipe } from "../../../../domain/Recipe/Recipe";

export interface RemoveFavoriteDTO {
  user: User;
  recipe: Recipe;
}
