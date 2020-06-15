import { Injectable, NotFoundException } from "@nestjs/common";
import { UsersService } from "../users/users.service";
import { JwtService } from "@nestjs/jwt";
import { User } from "src/users/users.model";

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(email);
    console.log(await user.validatePassword(pass));
    if (user && (await user.validatePassword(pass))) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: { email: string; password: string }) {
    const findUser = await this.validateUser(user.email, user.password);

    if (!findUser) throw new NotFoundException("No user found");
    const payload = { email: findUser.email, sub: findUser.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  register(newUser: User) {
    return this.usersService.createUser(
      newUser.email,
      newUser.password,
      newUser.name
    );
  }
}
