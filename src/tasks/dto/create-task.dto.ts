import { IsNotEmpty, IsEnum } from 'class-validator';

export class CreateTaskDto {
    @IsNotEmpty()
    task_description: string;

    @IsEnum(['Pendiente', 'En progreso', 'Completado'])
    task_state: string;

    @IsNotEmpty()
    task_user: number;
}

export class UpdateTaskDto extends CreateTaskDto {
    // no se necesit mas propiedades
}