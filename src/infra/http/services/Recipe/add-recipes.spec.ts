import { RecipeService } from "./recipes.service";
import { Recipe } from "@domain/Recipe/Recipe";
import { AddRecipeDTO } from "@infra/http/dtos/Recipe/addRecipe.dto";
import { InMemoryRecipeRepository } from "@test/repositories/in-memory-recipe-repository";

describe("RecipeService", () => {
  it("should add a new recipe", async () => {
    const recipeRepository = new InMemoryRecipeRepository();
    const recipeService = new RecipeService(recipeRepository);

    const userId = "user1";
    const recipeData: AddRecipeDTO = {
      title: "Recipe 1",
      description: "Description 1",
      ingredients: ["Ingredient 1", "Ingredient 2"],
      steps: ["Step 1", "Step 2"],
    };

    const result = await recipeService.addRecipe(userId, recipeData);
    

    expect(result).toBeInstanceOf(Recipe);
    expect(result).toBe(recipeData.title);
    expect(result).toBe(recipeData.description);
    expect(result).toEqual(recipeData.ingredients);
    expect(result).toEqual(recipeData.steps);
  });
});
