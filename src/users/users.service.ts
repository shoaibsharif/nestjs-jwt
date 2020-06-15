import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { User } from "./users.model";
import { show, store } from "quick-crud";

@Injectable()
export class UsersService {
  constructor(@InjectModel("User") private readonly userModel: Model<User>) {}

  async findOne(email: string): Promise<User | undefined> {
    return await show({ model: this.userModel, where: { email } });
  }

  async createUser(
    email: string,
    password: string,
    name: string
  ): Promise<User> {
    return store({ model: this.userModel, data: { email, password, name } });
  }
}
