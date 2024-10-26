import { Body, Controller, Post, Get } from "@nestjs/common";
import { UserService } from "./user.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { UserEntity } from "./user.entity";

@Controller('users')
export class UserController{
    constructor(private readonly userService: UserService){}

    @Post()
    async createUser(@Body() createUserDto: CreateUserDto){
        return this.userService.create(createUserDto);
    }

    @Get('users')
    async allUsers(): Promise<UserEntity[]>{
        return this.userService.all();
    }
}