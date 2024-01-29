import { UsersInterface } from "src/interfaces/interfaces";

export class CreateUserDto implements UsersInterface {
  readonly name: string;
  readonly email: string;
  readonly password: string;
}
