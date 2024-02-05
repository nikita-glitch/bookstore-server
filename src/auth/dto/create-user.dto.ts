import { UsersInterface } from "src/interfaces/interfaces";

export class CreateUserDto implements UsersInterface {
  readonly email: string;
  readonly password: string;
  readonly passwordToCompare: string;
}
