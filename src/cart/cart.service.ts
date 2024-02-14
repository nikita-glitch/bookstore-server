import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Cart } from './entities/cart.entity';
import { Repository } from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import { CartBooksService } from 'src/cart_books/cart_books.service';
import { ModuleRef } from '@nestjs/core';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(Cart)
    private cartRep: Repository<Cart>,
    @InjectRepository(User)
    private userRep: Repository<User>,
    private cartBooksService: CartBooksService,
    private moduleRef: ModuleRef
  ) {}
  async create() {
    const cart = this.cartRep.create();
    await this.cartRep.save(cart);
    return cart;
  }

  async getAllCartBooks(userId: string) {
    const cart = await this.cartRep.findOneBy({ userId: userId });
    if (!cart) {
      throw new HttpException('Cart not found', HttpStatus.NOT_FOUND);
    }
  }

  async addToCart(bookId: string, userId: string) {
    await this.cartBooksService.create(userId, bookId)
  }

  async removeFromCart(bookId: string, userId: string) {
    this.moduleRef.get(CartBooksService)
    await this.cartBooksService.remove(bookId, userId)
  }

  async changeAmount(bookId: string, userId: string, isIncrement: boolean) {
    await this.cartBooksService.changeAmount(bookId, userId, isIncrement)
  }
}
