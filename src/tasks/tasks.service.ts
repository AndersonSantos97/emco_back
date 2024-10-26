import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TaskEntity } from './tasks.entity';
import { UserEntity } from 'src/user/user.entity';
import { CreateTaskDto, UpdateTaskDto } from './dto/create-task.dto';


@Injectable()
export class TasksService {
    constructor(
        @InjectRepository(TaskEntity)
        private tasksRepositori: Repository<TaskEntity>,
        @InjectRepository(UserEntity)
        private userRespo: Repository<UserEntity>
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
        
        const user = await this.userRespo.findOne({
            where:{id: userid}
        })

        if(!user){
            return []
        }

        const rol = user.user_rol;
        let tasks;

        if(rol === 1){
            tasks = await this.tasksRepositori.find({
                relations: ['user']
            })
        }else if(rol === 3){
            tasks = await this.tasksRepositori.find({
                where:{user:{id: userid} },
                relations: ['user']
            })
        }else{
            return [];
        }

        if(!tasks || tasks.length === 0){
            return []
        }

        return tasks.map(task => ({
            id: task.id,
            task_description: task.task_description,
            task_state: task.task_state,
            user_name: task.user.user_name,
            task_user: task.user.id
        }))
    }

    async create(data: CreateTaskDto): Promise<TaskEntity>{
        const user = await this.userRespo.findOne({where: {id: data.task_user} })

        if(!user){
            throw new BadRequestException('Usuario no encontrado');
        }
        const task = this.tasksRepositori.create({...data, user: user});
        return this.tasksRepositori.save(task);
        
    }

    async update(id: number, data: UpdateTaskDto): Promise<TaskEntity>{
        const task = await this.tasksRepositori.findOne({
            where:{id},
            relations:['user']
        })

        if (!task) {
            throw new NotFoundException('Task not found');
        }
        
        if(data.task_user){
            const user = await this.userRespo.findOne({ where: { id: data.task_user } });
            if (!user) {
                throw new BadRequestException('User not found');
            }
            task.user = user;
            delete data.task_user;

        }
        // await this.tasksRepositori.update(id, data)
        //return this.findId(id);
        Object.assign(task, data);
        return this.tasksRepositori.save(task);
        
    }

    async remove(id: number): Promise<void>{
        await this.tasksRepositori.delete(id);
    }

}
