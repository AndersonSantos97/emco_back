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

    async all(): Promise<any[]>{
        const task = await this.tasksRepositori.find({
            relations:['user']
        })
        
        return task.map(task => ({
            id: task.id,
            task_description: task.task_description,
            task_state: task.task_state,
            user_name: task.user.user_name,
            task_user: task.user.id
        }))
    }

    async findId(id:number): Promise<any | undefined>{
        const task = await this.tasksRepositori.findOne({
            where:{id},
            relations: ['user']
        });

        if(!task){
            return undefined
        }

        return{
            id: task.id,
            task_description: task.task_description,
            task_state: task.task_state,
            user_name: task.user.user_name,
            task_user: task.user.id
        }
    }

    async findByUser(userid: number): Promise<any[]>{
        const task = await this.tasksRepositori.find({
            where:{user:{id: userid} },
            relations: ['user']
        })

        if(!task || task.length === 0){
            return []
        }

        return task.map(task => ({
            id: task.id,
            task_description: task.task_description,
            task_state: task.task_state,
            user_name: task.user.user_name,
            task_user: task.user.id
        }))
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
