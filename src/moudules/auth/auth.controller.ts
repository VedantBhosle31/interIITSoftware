import {
  Controller,
  Request,
  Get,
  Post,
  Session,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './utils/LocalGuard';
import { JwtAuthGuard } from './jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(JwtAuthGuard)
  @Post('login')
  login(@Request() req: any) {
    console.log('Entered login route');
    return this.authService.login(req);
  }
}
