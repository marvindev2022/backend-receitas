import { MissingParamError } from "@app/errors/MissingParamError";
import { HttpRequest } from "@app/protocols/http";
import { Recipe } from "./Recipe";

describe("Recipe", () => {
  const makeSut = (props: HttpRequest) => {
    const newRecipe = new Recipe(props.body, props.params);
    return newRecipe;
  };

  it("should throw missing error param if no title is provided", () => {
    const httpRequest = {
      body: {
        description: "any_description",
        ingredients: ["any_ingredients"],
        steps: ["any_steps"],
        category: "any_category",
      },
      params: {
        author: "any_id",
      },
    };

    expect(() => makeSut(httpRequest)).toThrow(new MissingParamError("title"));
  });

  it("should throw missing error param if no description is provided", () => {
    const httpRequest = {
      body: {
        title: "any_title",
        ingredients: ["any_ingredients"],
        steps: ["any_steps"],
        category: "any_category",
      },
      params: {
        author: "any_id",
      },
    };

    expect(() => makeSut(httpRequest)).toThrow(
      new MissingParamError("description")
    );
  });

  it("should throw missing error param if no ingredients is provided", () => {
    const httpRequest = {
      body: {
        title: "any_title",
        description: "any_description",
        steps: ["any_steps"],
        category: "any_category",
      },
      params: {
        author: "any_id",
      },
    };
    expect(() => makeSut(httpRequest)).toThrow(
      new MissingParamError("ingredients")
    );
  });

  it("should throw missing error param if no steps is provided", () => {
    const httpRequest = {
      body: {
        title: "any_title",
        description: "any_description",
        ingredients: ["any_ingredients"],
        category: "any_category",
      },
      params: {
        author: "any_id",
      },
    };
    expect(() => makeSut(httpRequest)).toThrow(new MissingParamError("steps"));
  });

  it("should throw missing error param if no category is provided", () => {
    const httpRequest = {
      body: {
        title: "any_title",
        description: "any_description",
        ingredients: ["any_ingredients"],
        steps: ["any_steps"],
      },
      params: {
        author: "any_id",
      },
    };
    expect(() => makeSut(httpRequest)).toThrow(
      new MissingParamError("category")
    );
  });

  it("should return a new recipe if request is valid", () => {
    const httpRequest = {
      body: {
        title: "any_title",
        description: "any_description",
        ingredients: ["any_ingredients"],
        steps: ["any_steps"],
        category: "any_category",
      },
      params: {
        author: "any_id",
      },
    };
    const newRecipe = makeSut(httpRequest);

    expect(newRecipe).toBeTruthy();
    expect(Object.values(newRecipe)).toBeTruthy();
  });
});
