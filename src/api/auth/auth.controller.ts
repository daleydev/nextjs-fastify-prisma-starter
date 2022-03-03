import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  async signup(@Body() dto: AuthDto) {
    console.log(dto);
    const { email, password } = dto;

    const user = await this.authService.lookupUserByEmail(email);

    if (user) return 'email is taken';

    return this.authService.signup(email, password);
  }

  @Post('signin')
  async signin(@Body() dto: AuthDto) {
    console.log(dto);
    const { email, password } = dto;

    return this.authService.signin(email, password);
  }
}
