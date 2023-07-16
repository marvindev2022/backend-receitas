import {
  BadRequestException,
  Body,
  Controller,
  HttpCode,
  Param,
  Post,
  Put,
} from "@nestjs/common";
import { RegisterUserDTO } from "@infra/http/dtos/User/registerUser.dto";
import { UserService } from "@infra/http/services/users/users.service";
import { UserLoginDTO } from "@infra/http/dtos/User/login.dto";
import { EditUserDTO } from "@infra/http/dtos/User/editUser.dto";

@Controller("users")
export class UsersController {
  constructor(private userService: UserService) {}

  @Post("signup")
  async register(@Body() registerUserDTO: RegisterUserDTO) {
    const id = await this.userService.register(registerUserDTO);

    if (id instanceof Error) {
      throw new BadRequestException(id.message);
    }

    return { message: "Usuário cadastrado com sucesso!" };
  }

  @Post("signin")
  async login(@Body() userLoginDTO: UserLoginDTO) {
    const token = await this.userService.login(userLoginDTO);

    return token;
  }

  @Post("validate/email")
  @HttpCode(200)
  async validateEmail(@Body() { email }: { email: string }) {
    if (!email) {
      throw new BadRequestException("E-mail inválido");
    }

    const emailValidationResponse = await this.userService.validateEmail(email);

    return emailValidationResponse;
  }

  @Put(":id")
  async edit(@Param("id") id: string, @Body() editUserDTO: EditUserDTO) {
    await this.userService.edit(id, editUserDTO);
  }

  
}
