import {
    Controller,
    Request,
    Get,
    Post,
    Session,
    UseGuards
} from "@nestjs/common";
import { AuthService } from "./auth.service";
import { LocalAuthGuard } from "./utils/LocalGuard";


@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }
    @UseGuards(LocalAuthGuard)
    @Post('login')
    login(@Request() req: any) {
        console.log('Entered login route');
        return this.authService.login(req);
    }
    @Get('')
    async getAuthSession(@Session() session: Record<string, any>) {
        session.authenticated = true;
        return session
    }
}