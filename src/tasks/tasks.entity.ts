import { join } from "path";
import { UserEntity } from "src/user/user.entity";
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, } from "typeorm";

@Entity('tasks')
export class TaskEntity{
    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: 'varchar', length:100})
    task_description: string;

    @Column({type:'varchar', length:13})
    task_state: string;


    @ManyToOne(() => UserEntity, user =>user.tasks)
    @JoinColumn({name: 'task_user'})
    user: UserEntity;
}