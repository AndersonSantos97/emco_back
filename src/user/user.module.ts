import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserEntity } from './user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoleEntity } from 'src/rol/rol.entity';
import { UserController } from './user.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity,RoleEntity])
  ],

  providers: [UserService],
  exports: [UserService],
  controllers: [UserController]
})
export class UserModule {}
