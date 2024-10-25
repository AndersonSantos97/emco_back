import { Controller, Body, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService){}

    @Post('login')
    async login(@Body() req: any){
        const user = await this.authService.validateUser(req.username, req.password);
        if(!user){
            return {message: 'Datos incorrectos'};
        }

        return this.authService.login(user)
    }
}

