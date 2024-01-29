import { PartialType } from "@nestjs/mapped-types";
import { CreateUserDto } from "./create-user.dto";

export class LoginUserDto extends PartialType(CreateUserDto) {
  readonly email: string;
  readonly password: string;
}