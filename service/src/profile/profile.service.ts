import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class ProfileService {
  constructor(private jwtService: JwtService) {}
  getProfile(authorization: string): any {
    const payload = this.jwtService.decode(authorization);
    // console.log('authorization', payload);
    return {
      id: payload['id'],
      full_name: payload['full_name'],
      email: payload['email']
    };
  }
}
