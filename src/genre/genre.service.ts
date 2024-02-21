import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Genre } from './entity/genre.entity';
import { Repository } from 'typeorm';

@Injectable()
export class GenreService {
  constructor(
    @InjectRepository(Genre)
    private genreRep: Repository<Genre>
  ) {}

  async create (name: string): Promise<void> {
    const isGenreExists = await this.genreRep.findOneBy({ genre_name: name })
    if (isGenreExists) {
      throw new HttpException("Genre alredy exists", HttpStatus.BAD_REQUEST)
    }
    const genre = this.genreRep.create({
      genre_name: name,
    })
    await this.genreRep.save(genre)
  }


  async getAll(): Promise<Genre[]> {
    return this.genreRep.find({})
  }
}
