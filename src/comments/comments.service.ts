import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Comment } from './entities/comment.entity';
import { Repository } from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import { Book } from 'src/books/entities/books.entity';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comment)
    private commentRep: Repository<Comment>,
    @InjectRepository(User)
    private userRep: Repository<User>,
    @InjectRepository(Book)
    private bookRep: Repository<Book>,
  ) {}

  async create(commentText: string, userId: string, bookId: string) {
    const [user, book] = await Promise.all([
      this.userRep.findOneBy({ id: userId }),
      this.bookRep.findOneBy({ id: bookId }),
    ]);

    if (!user) {
      throw new HttpException('User does not found', HttpStatus.NOT_FOUND);
    }

    if (!book) {
      throw new HttpException('Book does not found', HttpStatus.NOT_FOUND);
    }

    const comment = this.commentRep.create({
      text: commentText,
      user: user,
      book: book,
    });

    await this.commentRep.save(comment);

    return await this.commentRep.findOne({
      where: {
        id: comment.id,
      },
      relations: {
        user: {
          avatar: true,
        },
      },
    });
  }

  async getBookComments(bookId: string) {
    const comments = this.commentRep.find({
      where: { bookId: bookId },
      relations: {
        user: {
          avatar: true,
        },
      },
    });
    return comments;
  }
}
