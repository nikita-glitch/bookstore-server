import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Res, HttpStatus } from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { AuthGuard } from 'src/Guards/authGuard';
import { Response } from 'express';

@Controller('favorites')
export class FavoritesController {
  constructor(
    private favoritesService: FavoritesService
    ) {}

  @UseGuards(AuthGuard)
  @Get('')
  async getAllBooks(
    @Param('userId') 
    userId: string,
    @Res() res: Response
    ): Promise<Response<any, Record<string, any>>> {
    const favorite = await this.favoritesService.getBooksInFavorite(userId)
    return res.status(HttpStatus.OK).json(favorite) 
  }

}
