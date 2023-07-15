import { MissingParamError } from "@app/errors/MissingParamError";
import { HttpRequest } from "@app/protocols/http";
import { User } from "./User";

describe("User", () => {
  const makeSut = (props: HttpRequest) => {
    const newUser = new User(props.body);

    return newUser;
  };

  it("should throw missing error param if no name is provided", () => {
    const httpRequest = {
      body: {
        email: "any_email@mail.com",
        password: "any_password",
      },
    };

    expect(() => makeSut(httpRequest)).toThrow(new MissingParamError("name"));
  });

  it("should throw missing error param if no email is provided", () => {
    const httpRequest = {
      body: {
        name: "any_name",
        password: "any_password",
      },
    };

    expect(() => makeSut(httpRequest)).toThrow(new MissingParamError("email"));
  });

  it("should throw missing error param if no password is provided", () => {
    const httpRequest = {
      body: {
        name: "any_name",
        email: "any_email@mail.com",
      },
    };

    expect(() => makeSut(httpRequest)).toThrow(new MissingParamError("password"));
  });

  it("should return a new user if request is valid", () => {
    const httpRequest = {
      body: {
        name: "any_name",
        email: "any_email@mail.com",
        password: "any_password",
      },
    };
    const newUser = makeSut(httpRequest);

    expect(newUser).toBeTruthy();
    expect(Object.values(newUser)).toBeTruthy();
  });
});
