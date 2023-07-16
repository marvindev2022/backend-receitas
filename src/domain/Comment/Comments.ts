import { User } from "../User/User";
import { Recipe } from "../Recipe/Recipe";
import { AddCommentDTO } from "@infra/http/dtos/Comment/addComment.dto";
import { InvalidParamError } from "@app/errors/InvalidParamError";
import { MissingParamError } from "@app/errors/MissingParamError";
import { z } from "zod";

export interface CommentProps {
  id?: string;
  text: string;
  user: string;
  recipe: string;
}
interface NewComment {
  body: CommentProps;
  statusCode: number;
}

interface IsValidMethodReturn {
  isValid: boolean;
  body: any;
  statusCode: number;
}

export class Comment {
  props: CommentProps;

  constructor(data: AddCommentDTO) {
    const newComment = this.handle(data);

    this.props = {
      ...newComment.body,
      id: generateCommentId(),
      text: data.text,
      user: data.user,
      recipe: data.recipe,
    };
  }
  private handle(data: AddCommentDTO): NewComment {
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

  private isValid(data: AddCommentDTO): IsValidMethodReturn {
    const commentSchema = z.object({
      id: z.string(),
      text: z.string(),
      user: z.instanceof(User),
      recipe: z.instanceof(Recipe),
    });

    const commentIsValid = commentSchema.safeParse(data);

    if (!commentIsValid.success) {
      const errorPath = commentIsValid.error.errors[0].path[0].toString();
      const errorMessage = commentIsValid.error.errors[0].message;
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
}
function generateCommentId(): string {
  return `${Number(new Date())}`;
}
