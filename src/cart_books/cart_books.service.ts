import { Injectable } from '@nestjs/common';
import { CreateCartBookDto } from './dto/create-cart_book.dto';
import { UpdateCartBookDto } from './dto/update-cart_book.dto';

@Injectable()
export class CartBooksService {
  create(createCartBookDto: CreateCartBookDto) {
    return 'This action adds a new cartBook';
  }

  findAll() {
    return `This action returns all cartBooks`;
  }

  findOne(id: number) {
    return `This action returns a #${id} cartBook`;
  }

  update(id: number, updateCartBookDto: UpdateCartBookDto) {
    return `This action updates a #${id} cartBook`;
  }

  remove(id: number) {
    return `This action removes a #${id} cartBook`;
  }
}
