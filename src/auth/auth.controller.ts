import { Body, Get, Headers, HttpException, HttpStatus } from '@nestjs/common';
import { Controller } from '@nestjs/common';
import { AuthService } from './auth.service';

// TODO: Add custom error handling with a global interceptor
// Both routes currently leverage the standard nestjs error handler which returns a 500 status
// As the app grows I would consider implementing an interceptor for all routes which catches custom errors thrown from services and maps them to the relevant HTTP codes

// Authentication controller to handle 'root/' endpoints
@Controller('')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // Handles 'root/authentication' GET
  @Get('authenticate')
  async getToken(
    @Body('username') username: string,
    @Body('password') password: string,
  ): Promise<string> {
    try {
      const userInfo = await this.authService.validateUser(username, password);
      const token = this.authService.getToken(userInfo);
      return token;
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  // Handles 'root/welcome' GET
  @Get('welcome')
  validateToken(@Headers('Bearer') token: string): string {
    try {
      // TODO: Refactor validate function into a middleware which runs across all requests after initial login
      this.authService.validateToken(token);
      return 'Welcome to the app!';
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
