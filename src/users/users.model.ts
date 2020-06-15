import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import { Document, Schema as mongooseSchema } from "mongoose";
import * as bcrypt from "bcryptjs";
import { type } from "os";
interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  validatePassword(password: string): Promise<boolean>;
}

@Schema()
export class User extends Document {
  @Prop({ required: true })
  name: string;
  @Prop({ required: true })
  email: string;
  @Prop({ required: true })
  password: string;

  validatePassword(password: string) {
    return bcrypt.compare(password, this.password);
  }
}
export const userSchema: mongooseSchema<IUser> = SchemaFactory.createForClass(
  User
);

userSchema.pre<User>("save", async function () {
  this.password = await bcrypt.hash(this.password, 12);
});

// const getMethods = (obj: Function): string[] => {
//   return Object.getOwnPropertyNames(obj.prototype).filter(
//     (prop) => prop !== "constructor"
//   );
// };

// const allProperties = getMethods(User);
// console.log(allProperties);
// allProperties.forEach((item: string) => {
//   userSchema.methods[item] = User.prototype[item];
// });
