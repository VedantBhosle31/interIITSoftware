import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './local.statregy';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';

@Module({
    imports: [PassportModule, JwtModule.register({
        secret: 'secret',
        signOptions: {
            expiresIn: '60s'
        }
    })],
    providers: [AuthModule, LocalStrategy],
    exports: [AuthService]
})
export class AuthModule { }
