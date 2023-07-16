import { RecipeService } from "./recipes.service";
import { Recipe } from "@domain/Recipe/Recipe";
import { InMemoryRecipeRepository } from "@test/repositories/in-memory-recipe-repository";
import { NotFoundException } from "@nestjs/common";
import { EditRecipeDTO } from "@infra/http/dtos/Recipe/editRecipe.dto";
   
   describe("editRecipe", () => {
    const recipeRepository = new InMemoryRecipeRepository();
    const recipeService = new RecipeService(recipeRepository);
     it("should edit an existing recipe", async () => {
       const userId = "user1";
       const recipeId = "recipe1";
       const recipeData: EditRecipeDTO = {
         title: "Updated Recipe",
         description: "Updated Description",
         id: recipeId,
         userId,
       };

       recipeRepository.recipes.push(
         new Recipe(
           {
             title: "Recipe 1",
             description: "Description 1",
             ingredients: ["Ingredient 1", "Ingredient 2"],
             steps: ["Step 1", "Step 2"],
           },
           userId
         )
       );

       await recipeService.editRecipe(userId, recipeId, recipeData);

       const updatedRecipe = recipeRepository.recipes.find(
         (recipe) => recipe.props.id === recipeId
       );

       expect(updatedRecipe).toBeDefined();
       expect(updatedRecipe?.title).toBe(recipeData.title);
       expect(updatedRecipe?.description).toBe(recipeData.description);
     });

     it("should throw NotFoundException when the recipe is not found", async () => {
       const userId = "user1";
       const recipeId = "recipe1";
       const recipeData: EditRecipeDTO = {
         title: "Updated Recipe",
         description: "Updated Description",
         id: recipeId,
         userId,
       };

       await expect(
         recipeService.editRecipe(userId, recipeId, recipeData)
       ).rejects.toThrowError(NotFoundException);
     });
   });
