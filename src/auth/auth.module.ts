import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { NastModule } from 'src/transports/nast.module';

@Module({
  controllers: [AuthController],
  providers: [],
  imports: [
    NastModule
  ]
})
export class AuthModule { }
