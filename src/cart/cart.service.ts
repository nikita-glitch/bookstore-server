import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Cart } from './entities/cart.entity';
import { Repository } from 'typeorm';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(Cart)
    private cartRep: Repository<Cart>,
    @InjectRepository(User)
    private userRep: Repository<User>,
  ) {}
  async create() {
    const cart = this.cartRep.create();
    await this.cartRep.save(cart);
    return cart;
  }

  async getCartById(userId: string) {
    //const cart = await this.cartRep.findOneBy({ userId: userId });
    //   if (!cart) {
    //     throw new HttpException('Cart not found', HttpStatus.NOT_FOUND)
    //   }
    //   return cart
    // }
  }
}
