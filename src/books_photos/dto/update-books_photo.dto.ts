import { PartialType } from '@nestjs/mapped-types';
import { CreateBooksPhotoDto } from './create-books_photo.dto';

export class UpdateBooksPhotoDto extends PartialType(CreateBooksPhotoDto) {}
