import { InvalidParamError } from '@app/errors/InvalidParamError';
import { MissingParamError } from '@app/errors/MissingParamError';
import { z } from 'zod';

interface CategoryProps {
    name: string;
    url: string;
    createdAt?: Date;
    updatedAt?: Date;
  }  


interface NewCategory {
  body: CategoryProps;
  statusCode: number;
}

interface IsValidMethodReturn {
  isValid: boolean;
  body: any;
  statusCode: number;
}

export class Category {
  props: CategoryProps;

  constructor(props: CategoryProps) {
    const newCategory = this.handle(props);

    if (newCategory.statusCode >= 300) {
      throw newCategory.body;
    }

    this.props = newCategory.body;
  }

  private handle(props: CategoryProps): NewCategory {
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

  private isValid(params: CategoryProps): IsValidMethodReturn {
    const categorySchema = z.object({
      name: z.string().min(3, { message: 'Invalid' }),
      url: z.string().min(3, { message: 'Invalid' }),
    });

    const categoryIsValid = categorySchema.safeParse(params);

    if (!categoryIsValid.success) {
      const errorPath = categoryIsValid.error.errors[0].path[0].toString();
      const errorMessage = categoryIsValid.error.errors[0].message;
      const errorBody =
        errorMessage === 'Invalid'
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
