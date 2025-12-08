import { Body, Controller, Get, Inject, Logger, Post, Req, UseGuards } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { NATS_SERVICE } from 'src/config';
import { LoginUserDTO, RegisterUserDTO } from './dto';
import { catchError } from 'rxjs';
import { AuthGuard } from './guards/auth.guards';
import { User } from './decorators/user.decorator';
import { CurrentUser } from './interface/current-user.interface';
import { Token } from './decorators';

@Controller('auth')
export class AuthController {
  constructor(
    @Inject(NATS_SERVICE) private readonly client: ClientProxy
  ) { }

  private logger = new Logger('Auth gateway');

  @Post('register')
  registerUser(@Body() registerUserDTO: RegisterUserDTO) {
    this.logger.log('UserDTO: ', registerUserDTO)
    return this.client.send('auth.register.user', registerUserDTO)
      .pipe(
        catchError(error => {
          throw new RpcException(error)
        })
      )
  }

  @Post('login')
  loginUser(@Body() loginUserDTO: LoginUserDTO) {
    this.logger.log('UserDTO: ', loginUserDTO)
    return this.client.send('auth.login.user', loginUserDTO)
      .pipe(
        catchError(error => {
          throw new RpcException(error)
        })
      )
  }

  @UseGuards(AuthGuard)
  @Get('verify')
  verifyToken(@User() user: CurrentUser, @Token() token: string) {
    this.logger.log('Verify-----------', user)
    // return this.client.send('auth.verify.user', {})
    return { user, token }
  }
}
