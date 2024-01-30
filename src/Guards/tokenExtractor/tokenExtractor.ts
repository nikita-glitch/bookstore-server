import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { DecodedTokenInterface } from "src/interfaces/interfaces";

@Injectable()
export class TokenExtractor {
  constructor(
    private jwtService: JwtService
  ) {}
  async extract(req: any): Promise<DecodedTokenInterface> {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token || Object.keys(token).length === 0) {
      throw new HttpException('User does not found', HttpStatus.NOT_FOUND);
    }
    const decodedToken = await this.jwtService.verifyAsync(token, {
      secret: process.env.SECRET_KEY,
    });
    return decodedToken
  }
}