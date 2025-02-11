import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { clerkClient } from '@clerk/express';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    // 从请求头获取 token
    const token = req.headers.authorization;
    // const decoded = clerkClient.verifyToken(token);
    // console.log(decoded);
    if (!token) {
      return res.status(401).json({ message: 'Unauthorized.' });
    }

    // 这里添加你的 token 验证逻辑
    // 例如: 验证 JWT token, 检查权限等

    next();
  }
}