import { Module } from '@nestjs/common';
import { BooksAuthorService } from './books_author.service';
import { BooksAuthorController } from './books_author.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BooksAuthor } from './entities/books_author.entity';
import { User } from 'src/users/entities/user.entity';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [TypeOrmModule.forFeature([BooksAuthor, User]), JwtModule],
  controllers: [BooksAuthorController],
  providers: [BooksAuthorService],
})
export class BooksAuthorModule {}
