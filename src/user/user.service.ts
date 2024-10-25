import { Injectable } from '@nestjs/common';
import { InjectRepository} from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './user.entity';
import { RoleEntity } from 'src/rol/rol.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserEntity)
        private usersRepository: Repository<UserEntity>,
        @InjectRepository(RoleEntity)
        private rolRepository: Repository<RoleEntity>
    ){}

    async findUsername(username: string): Promise<UserEntity | undefined>{
        return this.usersRepository.findOne({
            where:{user_name: username}
        });
    }

    async findId(id:number): Promise<UserEntity | undefined>{
        return this.usersRepository.findOne({
            where:{id:id}
        });
    }

    async create(data: Partial<UserEntity>): Promise<UserEntity>{
        //const user = this.usersRepository.create(data);

        const {user_pass, user_rol} = data;

        ///hacer la encriptacion de la contraseña
        const rnd = 10;
        const hashed = await bcrypt.hash(user_pass,rnd);

        //const rol = await this.rolRepository.findOne({where: { id: user_rol }})

        // if(!rol){
        //     throw new Error('No se encontro rol');
        // }

        const userN = this.usersRepository.create({
            ...data,
            user_pass: hashed,
            user_rol: user_rol
        });

        return this.usersRepository.save(userN);
    }

    async update(id: number, data:Partial<UserEntity>): Promise<UserEntity>{
        await this.usersRepository.update(id,data);
        return this.findId(id);
    }

    async remove(id:number): Promise<void>{
        await this.usersRepository.delete(id);
    }
}
