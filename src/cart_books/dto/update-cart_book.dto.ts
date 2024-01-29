import { PartialType } from '@nestjs/mapped-types';
import { CreateCartBookDto } from './create-cart_book.dto';

export class UpdateCartBookDto extends PartialType(CreateCartBookDto) {}
