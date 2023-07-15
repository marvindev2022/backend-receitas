import { User } from "../User/User";
import { Recipe } from "../Recipe/Recipe";
import { AddCommentDTO } from "@infra/http/dtos/Comment/addComment.dto";

export class Comment {
  id: string  ;
  text: string;
  user: User;
  recipe: Recipe;

  constructor(data: AddCommentDTO) {
    this.id = generateCommentId(); 
    this.text = data.text;
    this.user = data.user;
    this.recipe = data.recipe;
  }
}

function generateCommentId(): string {
  return `${Number(new Date())}`
}
