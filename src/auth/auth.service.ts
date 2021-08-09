import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';

interface UserInfo {
  username: string;
  sub: string;
}

// Authentication service to handle validating users, creating tokens, and validating tokens
@Injectable()
export class AuthService {
  constructor(private configService: ConfigService) {}

  // Instead of dealing with data on the service level, we would use a repository to interact with the data layer
  // At the moment the configService acts as a data layer and pulls the user record from the .env file
  async validateUser(username: string, password: string): Promise<UserInfo> {
    const user = this.configService.get('USER');
    if (username !== user) {
      throw 'User not found';
    }
    const hashedPw = this.configService.get('PASSWORD');
    const matchStatus = await bcrypt.compare(password, hashedPw);
    if (matchStatus == false) {
      throw 'Password invalid';
    }
    const userId = this.configService.get('ID');
    return { username: user, sub: userId };
  }

  getToken(userInfo: any): string {
    // Creates a jwt token to be sent back to the client
    const secret = this.configService.get('JWTSECRET');
    const token = jwt.sign(userInfo, secret, { expiresIn: '2h' });
    return token;
  }

  validateToken(token: string): boolean {
    const secret = this.configService.get('JWTSECRET');
    jwt.verify(token, secret);
    return true;
  }
}
