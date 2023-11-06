import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { UserService } from 'src/moudules/user/user.service';
import jwt from 'jsonwebtoken';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class WsAuthGuard implements CanActivate {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}
  async canActivate(
    context: ExecutionContext,
  ): Promise<
    boolean | any | Promise<boolean | any> | Observable<boolean | any>
  > {
    console.log(context.getArgByIndex(0));
    const bearerToken = context
      .getArgByIndex(0)
      .handshake.headers.authorization.split(' ')[1];
    try {
      const decoded = (await this.jwtService.verify(bearerToken, {
        secret: process.env.SECRE,
      })) as any;
      return new Promise((resolve, reject) => {
        return this.userService.findUserByid(decoded.sub).then((user) => {
          if (user) {
            resolve(user);
          } else {
            reject(false);
          }
        });
      });
    } catch (ex) {
      console.log(ex);
      return false;
    }
  }
}
