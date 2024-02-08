import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Favorite } from './entities/favorite.entity';
import { Repository } from 'typeorm';
import { User } from 'src/users/entities/user.entity';


@Injectable()
export class FavoritesService {
  constructor(
    @InjectRepository(Favorite)
    private favoritesRep: Repository<Favorite>,
    @InjectRepository(User)
    private userRep: Repository<User>
  ) {}
  async create(): Promise<Favorite> {
    const favorites = this.favoritesRep.create()
    await this.favoritesRep.save(favorites)
    return favorites
  }

  async getFavoriteById(userId: string){
    // const favorite = this.favoritesRep.findOneBy({ userId: userId })
    // if (!favorite) {
    //   throw new HttpException('Favorite not found', HttpStatus.NOT_FOUND)
    // }
    // return favorite
  }
}
