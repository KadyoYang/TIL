import {
  HttpException,
  HttpStatus,
  Injectable,
  NestMiddleware,
} from '@nestjs/common';
import { NextFunction } from 'express';
import { UserService } from './user.service';
import { JwtPayloadType, verifyToken } from './util/jwtUtil';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private readonly userService: UserService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers['authorization'];

    if (authHeader && (authHeader as string).split(' ')[1]) {
      const tokenString: string = (authHeader as string).split(' ')[1];
      const decoded: JwtPayloadType = await verifyToken(tokenString);
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //@ts-ignore
      req.decoded = decoded;
      next();
    } else {
      throw new HttpException('invalid token', HttpStatus.UNAUTHORIZED);
    }
  }
}
