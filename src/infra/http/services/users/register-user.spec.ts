import { inMemoryUserRepository } from "@test/repositories/in-memory-user-repository";
import { UserService } from "./users.service";
import { User } from "@domain/User/User";
import { InMemoryRecipeRepository } from "@test/repositories/in-memory-recipe-repository";

describe("Users", () => {
  it("should register a new user", async () => {
    const userRepository = new inMemoryUserRepository();
    const recipeRepository = new InMemoryRecipeRepository
    const userService = new UserService(userRepository,recipeRepository);

    const newUser = new User({
      name: "any_name",
      email: "any_email@mail.com",
      password: "any_password",
    });

    if (!newUser.props) {
      throw new Error("Error creating new user");
    }

    const user = await userService.register(newUser.props);

    expect(userRepository.users[0]).toEqual(user);
    expect(
      userRepository.users[0].props?.password !== "any_password"
    ).toBeTruthy();
  });
});
