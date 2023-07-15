import { User } from "../../../../domain/User/User";
import { Recipe } from "../../../../domain/Recipe/Recipe";

export interface AddFavoriteDTO {
  user: User;
  recipe: Recipe;
}
