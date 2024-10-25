import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import { TaskEntity } from './tasks.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([TaskEntity])
  ],
  providers: [TasksService],
  controllers: [TasksController],
  exports: [TasksService]
})
export class TasksModule {}
