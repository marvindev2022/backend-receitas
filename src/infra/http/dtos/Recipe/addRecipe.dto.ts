import { User } from "../../../../domain/User/User";

export interface AddRecipeDTO {
  title: string;
  description: string;
  ingredients: string[];
  steps: string[];
  author: User;
}
