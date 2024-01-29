import { PartialType } from '@nestjs/mapped-types';
import { CreateBooksRatingDto } from './create-books_rating.dto';

export class UpdateBooksRatingDto extends PartialType(CreateBooksRatingDto) {}
