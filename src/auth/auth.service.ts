import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { User } from 'src/users/entities/user.entity';
import { CartService } from 'src/cart/cart.service';
import { FavoritesService } from 'src/favorites/favorites.service';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jwtServise: JwtService,
    private cartService: CartService,
    private favoritesService: FavoritesService
  ) {}
  async signUp(createUserDto: CreateUserDto) {
    const { email, password } = createUserDto;
    const person = await this.userRepository.findOneBy({ email: email });

    if (person) {
      throw new HttpException(
        'User with this email already exists',
        HttpStatus.BAD_REQUEST,
      );
    }
    const hashedPass = await bcrypt.hash(password, 3);
    const cart = await this.cartService.create();
    const favorite = await this.favoritesService.create();  
    const user = this.userRepository.create({
      email: email,
      password: hashedPass,
      favorite: favorite,
      cart: cart
    });    
    await this.userRepository.save(user)
    const userToReturn = await this.userRepository.findOne({
      where: {
        id: user.id 
      },
      relations: {
        cart: true,
        favorite: true,
        rating: true,
        avatar: true
      },
    });
    return userToReturn
  }

  async signIn(loginUserDto: LoginUserDto) {
    const { email, password } = loginUserDto;
  
    const person = await this.userRepository
    .createQueryBuilder("user")
    .where("user.email = :email", { email: email })
    .addSelect("user.password")
    .leftJoinAndSelect('user.cart', 'cart')
    .leftJoinAndSelect('user.favorite', 'favorite')
    .leftJoinAndSelect('user.avatar', 'avatar')
    .getOne()

    if (!person) {
      throw new HttpException('Wrong email or password', HttpStatus.NOT_FOUND);
    }
    const comparedPass = await bcrypt.compare(password, person.password);
    
    if (!comparedPass) {
      throw new HttpException(
        'Wrong email or password',
        HttpStatus.UNAUTHORIZED,
      );
    }

    const token = await this.jwtServise.signAsync(
      { id: person.id },
      { secret: process.env.SECRET_KEY },
    );
    return {token: token, user: person };
  }

}
