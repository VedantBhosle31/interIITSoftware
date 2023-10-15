import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { JwtModule } from '@nestjs/jwt';
import { ChatModule } from './moudules/chat/chat.module';
import { AuthModule } from './moudules/auth/auth.module';
import { MsgModule } from './moudules/msg/msg.module';
import { JwsStrategy } from './moudules/auth/jwt.strategy';


@Module({
  imports: [ChatModule, AuthModule, JwtModule.register({
    secret: 'secret',
    signOptions: { expiresIn: '60s' }
  }), MsgModule],
  controllers: [AppController, JwsStrategy],
  providers: [AppService],
})
export class AppModule { }
