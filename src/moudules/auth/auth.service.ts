import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { HashService } from "../user/hash.service";
import { UserService } from "../user/user.service";


@Injectable()
export class AuthService {
    constructor(private jwtService: JwtService,
        private hashService: HashService,
        private userService: UserService
    ) {

    }

    async validateUser(id: string, pass: string): Promise<any> {
        console.log("Inside validate user")
        const user = await this.userService.findUserByid(id);
        if (user && (await this.hashService.comparePassword(pass, user.password))) {
            return user;
        }
        return null;
    }

    async login(user: any) {
        const payload = {
            username: user.name,
            sub: user.id
        };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }



}