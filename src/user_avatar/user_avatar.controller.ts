import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserAvatarService } from './user_avatar.service';
import { CreateUserAvatarDto } from './dto/create-user_avatar.dto';
import { UpdateUserAvatarDto } from './dto/update-user_avatar.dto';

@Controller('user-avatar')
export class UserAvatarController {
  constructor(private readonly userAvatarService: UserAvatarService) {}

  @Post()
  create(@Body() createUserAvatarDto: CreateUserAvatarDto) {
    return this.userAvatarService.create(createUserAvatarDto);
  }

  @Get()
  findAll() {
    return this.userAvatarService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userAvatarService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserAvatarDto: UpdateUserAvatarDto) {
    return this.userAvatarService.update(+id, updateUserAvatarDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userAvatarService.remove(+id);
  }
}
