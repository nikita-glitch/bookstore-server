import { PartialType } from '@nestjs/mapped-types';
import { CreateFavoriteBookDto } from './create-favorite_book.dto';

export class UpdateFavoriteBookDto extends PartialType(CreateFavoriteBookDto) {}
