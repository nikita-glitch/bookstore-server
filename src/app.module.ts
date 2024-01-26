import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { CartModule } from './cart/cart.module';
import { FavoritesModule } from './favorites/favorites.module';
import { BooksModule } from './books/books.module';
import { ProfileModule } from './profile/profile.module';

const filePath = '/home/fusion-team/proj/bookstor/server/src/.env'

@Module({
  imports: [ConfigModule.forRoot({ envFilePath: filePath }), TypeOrmModule.forRoot({
    type: 'postgres',
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    entities: [],
  }), UsersModule, AuthModule, CartModule, FavoritesModule, BooksModule, ProfileModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
