import { Body, Controller, Inject, Post } from '@nestjs/common';
import { AuthService } from './auth-service.service';
import { ApiTags, ApiOperation, ApiBody } from '@nestjs/swagger';
import { LoginDetails, RegisterDetails } from './auth.model';

@ApiTags('auth')
@Controller('auth')
export class AuthServiceController {
  constructor(@Inject(AuthService) private readonly authService: AuthService) {
    console.log('AuthServiceController created, authService:', !!authService);
  }

  @Post('register')
  @ApiOperation({ summary: 'Register a new user' })
  @ApiBody({ type: RegisterDetails })
  register(@Body() registerBody: RegisterDetails) {
    console.log('register called, authService:', !!this.authService);
    return this.authService.register(registerBody);
  }

  @Post('login')
  @ApiOperation({ summary: 'Login a user' })
  @ApiBody({ type: LoginDetails })
  login(@Body() loginBody: LoginDetails) {
    return this.authService.login(loginBody);
  }
}
