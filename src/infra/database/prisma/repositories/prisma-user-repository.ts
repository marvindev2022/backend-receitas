import { sign } from "jsonwebtoken";
import { PrismaService } from "../prisma.service";
import { User } from "@domain/User/User";
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { UserRepository } from "@app/repositories/User/user";
import { UserLoginDTO } from "@infra/http/dtos/User/login.dto";
import { compareToEncrypted } from "@app/protocols/crypto/compare/compareToEncrypted";
import { EditUserDTO } from "@infra/http/dtos/User/editUser.dto";
import { FindedUserDTO } from "@infra/http/dtos/User/findedUser.dto";
import { Recipe } from "@domain/Recipe/Recipe";

@Injectable()
export class PrismaUserRepository implements UserRepository {
  constructor(private prismaService: PrismaService) {}

  async register(user: User): Promise<string> {
    if (user instanceof Error) {
      throw new BadRequestException(user.message, {
        cause: user,
        description: user.stack,
      });
    }

    const { ...userProps } = user.props;

    const { id } = await this.prismaService.users.create({
      data: {
        ...userProps,
      },
      select: {
        id: true,
      },
    });

    return id;
  }

  async login(account: UserLoginDTO): Promise<any | BadRequestException> {
    const databaseStored = await this.prismaService.users.findUnique({
      where: { email: account.email },
    });

    if (
      !databaseStored?.password ||
      !compareToEncrypted({
        receivedString: account.password,
        encryptedString: databaseStored.password,
      })
    ) {
      throw new BadRequestException("Usuário ou senha inválidos");
    }
  const {password,...user} = databaseStored
    return ({...user,token:sign({ id: databaseStored.id }, process.env.JWT_SECRET!)});
  }

  async edit(
    userId: string,
    account: EditUserDTO
  ): Promise<void | BadRequestException> {
    if (!userId) {
      throw new BadRequestException("Identificação inválida");
    }

    await this.prismaService.users.update({
      data: {
        name: account.name,
        email: account.email,
        password: account.password,
      },
      where: {
        id: userId,
      },
    });
  }

  async findUserById(id: string): Promise<any | BadRequestException> {
    const user = await this.prismaService.users.findFirst({
      where: { id },
    });

    if (!user) {
      throw new BadRequestException("Usuário não encontrado");
    }

    return user;
  }

  async findByEmail(email: string): Promise<FindedUserDTO | NotFoundException> {
    const databaseResponse = await this.prismaService.users.findUnique({
      where: {
        email,
      },
    });

    if (!databaseResponse || Object.values(databaseResponse).length < 1) {
      throw new NotFoundException("Nenhum usuário encontrado");
    }

    return databaseResponse;
  }

  async favoriteRecipe(user: User, recipe: Recipe): Promise<void | Error> {
    const userModel = this.prismaService.users;

    const isFavorite = user.props.favoriteRecipes?.some(
      (favRecipe) => favRecipe === recipe.props.id
    );
    if (isFavorite) return;
    if (!recipe.props.id) return;
    user.props.favoriteRecipes?.push(recipe.props.id);

    await userModel.update({
      where: { email: user.props.email },
      data: { recipes: { connect: { id: recipe.props.id } } },
    });
  }

  async unfavoriteRecipe(user: User, recipe: Recipe): Promise<void | Error> {
    const userModel = this.prismaService.users;

    user.props.favoriteRecipes = user.props.favoriteRecipes?.filter(
      (favRecipe) => favRecipe !== recipe.props.id
    );

    await userModel.update({
      where: { email: user.props.email },
      data: { recipes: { disconnect: { id: recipe.props.id } } },
    });
  }
}
