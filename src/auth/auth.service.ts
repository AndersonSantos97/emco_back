import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
    constructor(
        private UserService: UserService,
        private jwtService: JwtService
    ){}

    async validateUser(username: string, pass: string): Promise<any>{
        const user = await this.UserService.findUsername(username);

        if(user && await bcrypt.compare(pass, user.user_pass)){
            const {user_pass, ...result} = user;
            return result
        }
        return null
    }

    async login(user: any){
        const data = {username: user.user_name, sub: user.id, rol: user.user_rol};
        return {
            access_token: this.jwtService.sign(data)
        };
    }
}
