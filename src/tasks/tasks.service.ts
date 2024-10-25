import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TaskEntity } from './tasks.entity';


@Injectable()
export class TasksService {
    constructor(
        @InjectRepository(TaskEntity)
        private tasksRepositori: Repository<TaskEntity>
    ){}

    async all(): Promise<TaskEntity[]>{
        return this.tasksRepositori.find();
    }

    async findId(id:number): Promise<TaskEntity | undefined>{
        return this.tasksRepositori.findOne({
            where:{id}
        })
    }

    async create(data: Partial<TaskEntity>): Promise<TaskEntity>{
        const task = this.tasksRepositori.create(data);
        return this.tasksRepositori.save(data);
        
    }

    async update(id: number, data: Partial<TaskEntity>): Promise<TaskEntity>{
        await this.tasksRepositori.update(id, data)
        return this.findId(id);
    }

    async remove(id: number): Promise<void>{
        await this.tasksRepositori.delete(id);
    }

}
