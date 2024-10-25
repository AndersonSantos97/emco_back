import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RoleEntity } from './rol.entity';


@Injectable()
export class RolService {
    constructor(
        @InjectRepository(RoleEntity)
        private rolesRepository: Repository<RoleEntity>
    ){}

    async all(): Promise<RoleEntity[]>{
        return this.rolesRepository.find();
    }

    async finId(id:number): Promise<RoleEntity | undefined>{
        return this.rolesRepository.findOne({
            where: {id}
        })
    }

    async create(data: Partial<RoleEntity>): Promise<RoleEntity>{
        const role = this.rolesRepository.create(data);
        return this.rolesRepository.save(role);
    }

    async update(id: number, data: Partial<RoleEntity>): Promise<RoleEntity> {
        await this.rolesRepository.update(id, data);
        return this.finId(id);
    }

    
    async remove(id: number): Promise<void> {
        await this.rolesRepository.delete(id);
    }

}
