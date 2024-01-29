import { PartialType } from '@nestjs/mapped-types';
import { CreateUserAvatarDto } from './create-user_avatar.dto';

export class UpdateUserAvatarDto extends PartialType(CreateUserAvatarDto) {}
