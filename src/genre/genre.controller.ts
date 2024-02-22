import { Body, Controller, Get, HttpStatus, Post, Res, UseGuards } from '@nestjs/common';
import { GenreService } from './genre.service';
import { AuthGuard } from 'src/Guards/authGuard';
import { Roles } from 'src/decorator/role.decorator';
import { Response } from 'express';

@Controller('genre')
export class GenreController {
  constructor(private readonly genreService: GenreService) {}

  @Post()
  @UseGuards(AuthGuard)
  @Roles("admin")
  async createGenre(
    @Body('name')
    name: string,
    @Res() res: Response
  ) {
    await this.genreService.create(name)
    res.status(HttpStatus.CREATED).json({ message: "Genre created" })
  }

  @Get()
  async getAll(
    @Res() res: Response
  ) {
    const genres = await this.genreService.getAll()
    res.status(HttpStatus.CREATED).json(genres)
  }
}
