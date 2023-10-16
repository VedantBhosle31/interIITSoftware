import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './local.statregy';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { HashService } from '../user/hash.service';
import { UserService } from '../user/user.service';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
    imports: [PrismaModule, PassportModule, JwtModule.register({
        secret: 'secret',
        signOptions: {
            expiresIn: '60s'
        }
    })],
    providers: [AuthModule, LocalStrategy, AuthService, HashService, UserService],
})
export class AuthModule { }
