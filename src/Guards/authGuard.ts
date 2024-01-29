import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TokenExtractor } from './tokenExtractor/tokenExtractor';
import { Reflector } from '@nestjs/core';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    @InjectRepository(User)
    private userRep: Repository<User>,
    private jwtService: JwtService,
    private reflector: Reflector
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {    
    const isAuthRequired =this.reflector.get<boolean>('auth', context.getHandler())
    if (!isAuthRequired) {
      return true
    }
    const req = context.switchToHttp().getRequest();    
    const tokenExtractor = new TokenExtractor(this.jwtService);
    const decodedToken = await tokenExtractor.extract(req);
    const user = await this.userRep.findOneBy({ id: decodedToken.id });        
    if (!user) {
      throw new HttpException('User does not found', HttpStatus.NOT_FOUND);
    }
    req.params.userId = decodedToken.id;
    return true;
  }
}
