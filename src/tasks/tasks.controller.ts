import { BadRequestException, Body, Controller, Delete, Get, NotFoundException, Param, Post, Put } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TaskEntity } from './tasks.entity';
import { retry } from 'rxjs';

@Controller('tasks')
export class TasksController {

    constructor(private readonly tasksService: TasksService){}

    @Get()
    async allTask(): Promise<any[]>{
        return this.tasksService.all();
    }

    @Get(':id')
    async taskId(@Param('id') id: number): Promise<any>{
        const task =  this.tasksService.all()

        if(!task){
            throw new NotFoundException(`No se encontro tarea con id ${id}`)
        }

        return task;
    }

    @Post()
    async createTask(@Body() data: Partial<TaskEntity>): Promise<TaskEntity>{
        if(!data.task_description || !data.task_state || !data.user){
            throw new BadRequestException('Faltan datos')
        }
        
        return this.tasksService.create(data);
    }

    @Put(':id')
    async updateTask(
        @Param('id') id: number,
        @Body() data: Partial<TaskEntity>
    ): Promise<TaskEntity>{
        const task = await this.tasksService.findId(id);

        if(!task){
            throw new NotFoundException('No se encontro tarea para actualizar');
        }

        return this.tasksService.update(id, data)
    }


    @Delete(':id')
    async deleteTask(@Param('id') id: number): Promise<void>{
        
        const task = await this.tasksService.findId(id);

        if (!task) {
            throw new NotFoundException('No se encontro la tarea que desea eliminar');
        }
        
        return this.tasksService.remove(id)
    }

    @Get('user/:userid')
    async taskByUser(@Param('userid') userid: number){
        return this.tasksService.findByUser(userid);
    }
}
