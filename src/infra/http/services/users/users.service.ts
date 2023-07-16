import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { UserRepository } from "@app/repositories/User/user";
import { User } from "@domain/User/User";
import { InvalidParamError } from "@app/errors/InvalidParamError";
import { UserLoginDTO } from "@infra/http/dtos/User/login.dto";
import { EditUserDTO } from "@infra/http/dtos/User/editUser.dto";
import { RegisterUserDTO } from "@infra/http/dtos/User/registerUser.dto";
import { EmailValidationResponseDTO } from "@infra/http/dtos/User/emailValidationResponse.dto";
import { z } from "zod";
@Injectable()
export class UserService {
  constructor(private userRepository: UserRepository) {}

  async register(request: RegisterUserDTO): Promise<User | Error> {
    const newUser = new User(request);

    await this.userRepository.register(newUser);
    return newUser;
  }

  async login(request: UserLoginDTO): Promise<string> {
    const requestSchema = z.object({
      email: z.string().email().min(6, { message: "Invalid" }),
      password: z.string(),
    });

    const loginProps = requestSchema.safeParse(request);

    if (!loginProps.success) {
      throw new BadRequestException("Erro ao realizar login", {
        cause: new BadRequestException(),
        description: loginProps.error.errors[0].message,
      });
    }

    const userLoginResponse = await this.userRepository.login(loginProps.data);

    if (userLoginResponse instanceof Error) {
      throw userLoginResponse;
    }

    return userLoginResponse;
  }

  async edit(userId: string, request: EditUserDTO): Promise<void | Error> {
    if (!userId) {
      throw new BadRequestException("Identificação de usuário inválida");
    }

    const editionGoneWrong = await this.userRepository.edit(userId, request);

    if (editionGoneWrong instanceof Error) {
      throw editionGoneWrong;
    }
  }

  async validateEmail(email: string): Promise<EmailValidationResponseDTO> {
    const bodySchema = z.string().email({ message: "E-mail" });
    const sendedEmail = bodySchema.safeParse(email);

    if (!sendedEmail.success) {
      throw new InvalidParamError(sendedEmail.error.message);
    }

    const emailIsValid = await this.userRepository.findByEmail(
      sendedEmail.data
    );

    if (emailIsValid instanceof NotFoundException) {
      return {
        isAvailable: true,
        message: "Nenhum usuário está cadastrado com este e-mail",
      };
    }

    return {
      isAvailable: false,
      message: "Já existe um usuário cadastrado com este e-mail",
    };
  }
}
