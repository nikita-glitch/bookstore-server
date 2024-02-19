import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CartBook } from './entities/cart_book.entity';
import { Repository } from 'typeorm';
import { Cart } from 'src/cart/entities/cart.entity';
import { Book } from 'src/books/entities/books.entity';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class CartBooksService {
  constructor(
    @InjectRepository(CartBook)
    private cartBookRep: Repository<CartBook>,
    @InjectRepository(Cart)
    private cartRep: Repository<Cart>,
    @InjectRepository(Book)
    private bookRep: Repository<Book>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}
  async create(userId: string, bookId: string) {
    const user = await this.userRepository.findOneBy({ id: userId }) 
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    const cart = await this.cartRep.findOneBy({ id: user.cartId });
    if (!cart) {
    }
    const book = await this.bookRep.findOneBy({ id: bookId });
    if (!book) {
    }
    const isInCart = await this.cartBookRep.findOneBy({
      bookId: bookId,
      cartId: cart.id,
    });
    if (isInCart) {
      await this.cartBookRep.update(isInCart, { amount: isInCart.amount + 1 });
    }
    const cartBook = this.cartBookRep.create({
      cart: cart,
      book: book,
      amount: 1,
    });
    await this.cartBookRep.save(cartBook);
    return cartBook
  }

  async findAllCartBooks(cartId: string) {
    const cartBooks = this.cartBookRep.find({
      where: {
        cartId: cartId,
      },
      relations: {
        book: true,
      },
    });
    return cartBooks;
  }

  async remove(bookId: string, userId: string) {
    const user = await this.userRepository.findOneBy({ id: userId }) 
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    const cart = await this.cartRep.findOneBy({ id: user.cartId });
    if (!cart) {
    }
    const cartBook = await this.cartBookRep.findOneBy({
      cartId: cart.id,
      bookId: bookId,
    });
    await this.cartBookRep.remove(cartBook);
  }
  
  async changeAmount(bookId: string, userId: string, isIncrement: boolean) {
    const user = await this.userRepository.findOneBy({ id: userId }) 
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    const cart = await this.cartRep.findOneBy({ id: user.cartId });
    if (!cart) {
    }
    const cartBook = await this.cartBookRep.findOneBy({
      cartId: cart.id,
      bookId: bookId,
    });
    if (isIncrement) {
      await this.cartBookRep.update(cartBook, { amount: cartBook.amount + 1 });
    } else {
      if (cartBook.amount === 1) {
        await this.cartBookRep.remove(cartBook);
      } else {
        await this.cartBookRep.update(cartBook, {
          amount: cartBook.amount - 1,
        });
      }
    }
  }
}
