import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { clerkClient, getAuth } from '@clerk/express';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private jwtService: JwtService) {}
  use(req: Request, res: Response, next: NextFunction) {
    // // TODO: 可能需要更详细的权限判断
    // const auth = getAuth(req);
    // console.log(auth);
    // console.log(auth.userId);
    if(req.headers.authorization) {
      const payload = this.jwtService.decode(req.headers.authorization);
      // req.headers['user_id'] = payload['id'];
      // req.headers['user_sid'] = payload['sid'];
      // req.headers['user_sub'] = payload['sub'];
      // req.headers['user_email'] = payload['email'];
      // req.headers['user_full_name'] = payload['full_name'];
      if (!payload['id']) {
        return res.status(401).send('Unauthorized');
      }
    } else {
      return res.status(401).send('Unauthorized');
    }
    return next();
  }
}