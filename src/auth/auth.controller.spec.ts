import { ConfigModule, ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

describe('AuthController', () => {
  let controller: AuthController;

  let testToken =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InVzZXIiLCJzdWIiOiIxMjM0IiwiaWF0IjoxNjI4NDgwNjA4LCJleHAiOjE2Mjg0ODc4MDh9.tMwPPF6qsJBp4reWibt54Yob-k_shG-JsaSYzImgH98';

  const mockAuthService = {
    validateUser: jest.fn((username, password) => {
      return { username: username, sub: '1234' };
    }),
    getToken: jest.fn((userInfo) => {
      return testToken;
    }),
    validateToken: jest.fn((token) => {
      return true;
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule],
      controllers: [AuthController],
      providers: [AuthService, ConfigService],
    })
      .overrideProvider(AuthService)
      .useValue(mockAuthService)
      .compile();

    controller = module.get<AuthController>(AuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should getToken', () => {
    const username = 'user';
    const password = 'password';
    expect(controller.getToken(username, password)).resolves.toBe(testToken);
    expect(mockAuthService.validateUser).toHaveBeenCalledWith(
      username,
      password,
    );
  });

  it('should validateToken', () => {
    expect(controller.validateToken(testToken)).toBe('Welcome to the app!');
    expect(mockAuthService.validateToken).toHaveBeenCalledWith(testToken);
  });
});
