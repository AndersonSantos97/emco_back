import { Get, Post, Body, Param, Put, Delete, Controller } from "@nestjs/common";
import { RolService } from "./rol.service";
import { RoleEntity } from "./rol.entity";
import { get } from "http";

@Controller('roles')
export class RolController{
    constructor (private readonly rolService: RolService){}

    @Get()
    async allRols(): Promise<RoleEntity[]>{
        return this.rolService.all();
    }

    @Get(':id')
    async finId(@Param('id') id: number):Promise<RoleEntity | undefined>{
        return this.rolService.finId(id);
    }


    @Post()
    async create(@Body() roldt: Partial<RoleEntity>): Promise<RoleEntity>{
        return this.rolService.create(roldt);
    }

    @Put(':id')
    async update(@Param('id') id: number, @Body() roldt:Partial<RoleEntity>): Promise<RoleEntity>{
        return this.rolService.update(id, roldt);
    }


    @Delete(':id')
    async remove(@Param('id') id: number): Promise<void>{
        return this.rolService.remove(id);
    }
}
