import { inMemoryUserRepository } from "@test/repositories/in-memory-user-repository";
import { UserService } from "./users.service";
import { User } from "@domain/User/User";
import { BadRequestException } from "@nestjs/common";

describe("Users", () => {
  const userRepository = new inMemoryUserRepository();
  const userService = new UserService(userRepository);

  const makeSud = async () => {
    const newUser = new User({
      name: "any_name",
      email: "any_email@mail.com",
      password: "any_password",
     
    });

    if (!newUser.props) {
      throw new Error("Error creating new user");
    }

    const user = await userService.register(newUser.props);

    if (user instanceof Error) {
      throw user;
    }

    return user;
  };

  it("should throw an error when user not be able to sign in", async () => {
    const user = await makeSud();
    const password = "not_valid";

    const userLoginResponse = await userRepository.login({
      email: user.props.email,
      password,
    });

    expect(userLoginResponse).toEqual(
      new BadRequestException("E-mail or password are incorrect")
    );
  });

  it("should receive a token when user be able to sign in", async () => {
    const user = await makeSud();
    const { email } = user.props;
    const password = "any_password";

    const token = await userRepository.login({ email, password });

    expect(token).toBeTruthy();
  });
});
