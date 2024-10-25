import { Entity, Column, PrimaryGeneratedColumn, } from "typeorm";

@Entity('tasks')
export class TaskEntity{
    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: 'varchar', length:100})
    task_description: string;

    @Column({type:'varchar', length:13})
    task_state: string;

    @Column({type:'int'})
    task_user: number;
}