import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import { TaskEntity } from './tasks.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/user/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([TaskEntity, UserEntity])
  ],
  providers: [TasksService],
  controllers: [TasksController],
  exports: [TasksService]
})
export class TasksModule {}
