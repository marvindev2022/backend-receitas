import { inMemoryUserRepository } from "@test/repositories/in-memory-user-repository";
import { UserService } from "./users.service";
import { BadRequestException } from "@nestjs/common";
import { User } from "@domain/User/User";

describe("Edit user service", () => {
  const userRepository = new inMemoryUserRepository();
  const userService = new UserService(userRepository);

  const makeSut = async () => {
    const newUser = new User({
      name: "any_name",
      email: "any_email@mail.com",
      password: "any_password",
      favoriteRecipes: ["any_favorite"],
    });

    if (!newUser.props) {
      throw new Error("Erro ao criar usuário!");
    }

    const user = await userService.register(newUser.props);

    return user;
  };

  it("should throw an error if no identification is provided", async () => {
    const userId = "";
    const user = {
      name: "any",
    };

    await makeSut();

    expect(async () => {
      await userService.edit(userId, user);
    }).rejects.toThrow(
      new BadRequestException("Identificação de usuário inválida")
    );
  });

  it("should edit existing user if identification is provided", async () => {
    const userId = "any_name";
    const user = {
      name: "any",
    };

    await makeSut();

    userService.edit(userId, user);

    expect(userRepository.users[0].props.name).toEqual(user.name);
  });
});
