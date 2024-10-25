import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from "typeorm";

@Entity('roles')
export class RoleEntity{
    @PrimaryGeneratedColumn()
    id: number;


    @Column({type:'varchar', length: 10})
    rol_description: string;


    @Column({type:'int'})
    rol_state: number;
}
