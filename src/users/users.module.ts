import { Module } from "@nestjs/common";
import { UsersService } from "./users.service";
import { MongooseModule } from "@nestjs/mongoose";
import { userSchema, User } from "./users.model";

@Module({
  imports: [MongooseModule.forFeature([{ schema: userSchema, name: "User" }])],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
