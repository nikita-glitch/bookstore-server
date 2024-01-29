import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './change-password.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {}
