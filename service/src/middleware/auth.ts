import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { clerkClient, getAuth } from '@clerk/express';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const auth = getAuth(req);
    console.log(auth);
    console.log(auth.userId);

    // TODO: 可能需要更详细的权限判断
    if (!auth.userId) {
      return res.status(401).send('Unauthorized');
    }
    return next();
  }
}