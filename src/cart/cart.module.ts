import { Module } from '@nestjs/common';
import { CartService } from './cart.service';
import { CartController } from './cart.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { Cart } from './entities/cart.entity';
import { JwtModule, JwtService } from '@nestjs/jwt';


@Module({
  imports: [TypeOrmModule.forFeature([User, Cart]), JwtModule],
  controllers: [CartController],
  providers: [CartService],
})
export class CartModule {}
