import { RoleEntity } from "src/rol/rol.entity";
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
@Entity('users')
export class UserEntity{
    @PrimaryGeneratedColumn()
    id: number;

    @Column({type:'varchar', length: 8})
    user_name: string;

    @Column({type:'int'})
    user_state: number;

    @Column({type: 'int'})
    user_rol: number;

    @Column({type: 'varchar', length:200})
    user_pass: string

    // @ManyToOne(() => RoleEntity, role =>role.id)
    // user_rol: RoleEntity;
}