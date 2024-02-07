import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { CartService } from 'src/cart/cart.service';
import { FavoritesService } from 'src/favorites/favorites.service';
import { Cart } from 'src/cart/entities/cart.entity';
import { Favorite } from 'src/favorites/entities/favorite.entity';

@Module({
  imports: [ TypeOrmModule.forFeature([User, Cart, Favorite]), JwtModule.register({
    secret: process.env.SECRET_KEY,
    signOptions: { expiresIn: '1h' },
  })],
  controllers: [AuthController,],
  providers: [AuthService, CartService, FavoritesService],
})
export class AuthModule {}
