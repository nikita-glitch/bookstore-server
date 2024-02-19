import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Put,
  Query,
  HttpStatus,
  Res,
  UseGuards,
  Req,
  UploadedFile,
  UseInterceptors,
  StreamableFile,
  ClassSerializerInterceptor,
} from '@nestjs/common';
import { BooksService } from './books.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { Roles } from 'src/decorator/role.decorator';
import { Request, Response } from 'express';
import { AuthGuard } from 'src/Guards/authGuard';
import { SortOptionsInterface } from 'src/interfaces/interfaces';
import { FileInterceptor } from '@nestjs/platform-express';
import { Readable } from 'stream';

@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @UseGuards(AuthGuard)
  @Roles('admin')
  @Post()
  async create(
    @Body()
    createBookDto: CreateBookDto,
    @Res() res: Response,
  ) {
    await this.booksService.addBook(createBookDto);
    res.status(HttpStatus.CREATED).json({ message: 'Created' });
  }

  @Get('')
  async findAll(
    @Query('paginationOffset')
    paginationOffset: number,
    @Query('sortOptions')
    sortOptions: SortOptionsInterface,
    @Query('searchString')
    searchString: string,
  ) {
    const books = await this.booksService.findAll(
      paginationOffset,
      searchString,
      sortOptions,
    );
    return books;
  }

  @Get(':id')
  async findOne(
    @Param('id')
    id: string,
  ) {
    const book = await this.booksService.findOne(id);
    
    return book;
  }

  @Get(':id/photo')
  async getBookPhoto(
    @Param('id')
    id: string,
    @Res({ passthrough: true }) res: Response,
  ) {
    const photo = await this.booksService.getBookPhoto(id);    
    const stream = Readable.from(photo.data);
    res.set({
      'Content-Disposition': `inline; filename="${photo.photoName}"`,
      'Content-Type': 'image',
    });
    return new StreamableFile(stream);

  }

  @UseGuards(AuthGuard)
  @Roles('admin')
  @Patch(':id')
  async update(
    @Param('id')
    id: string,
    @Body()
    updateBookDto: UpdateBookDto,
  ) {
    return this.booksService.updateBook(+id, updateBookDto);
  }

  @UseGuards(AuthGuard)
  @Roles('admin')
  @Delete(':id')
  async remove(
    @Param('id')
    id: string,
  ) {
    return this.booksService.removeBook(+id);
  }

  @UseGuards(AuthGuard)
  @Roles('admin')
  @UseInterceptors(FileInterceptor('file'))
  @Post(':id/photo')
  async addPhoto(
    @UploadedFile()
    file: Express.Multer.File,
    @Param('id')
    id: string,

    @Res() res: Response,
  ) {
    await this.booksService.addPhoto(file.originalname, file.buffer, id);
    return res.status(HttpStatus.OK).json({ message: "Photo added" });
  }

  @UseGuards(AuthGuard)
  @Post('rating')
  async setRating(
    @Body()
    bookId: string,
    @Res() res: Response,
  ) {
    const rating = await this.booksService.countRating(bookId);
    return res.status(HttpStatus.OK).json(rating);
  }

  @Get(':id/comments')
  async getcomments(
    @Param('id')
    id: string,
    @Res() res: Response,
  ) {
    const comments = await this.booksService.getComments(id);
    return res.status(HttpStatus.OK).json(comments);
  }
}
