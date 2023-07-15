import { User } from "../../../../domain/User/User";
import { Recipe } from "../../../../domain/Recipe/Recipe";

export interface AddCommentDTO {
  id: string;
  text: string;
  user: User;
  recipe: Recipe;
}
