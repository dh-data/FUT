import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Headers } from '@nestjs/common';

@Injectable()
export class ProfileService {
  constructor(private jwtService: JwtService) {}
  getProfile(@Headers('authorization') authorization: string): string {
    const payload = this.jwtService.decode(authorization);
    console.log('payload', payload);
    return payload;
  }
}
