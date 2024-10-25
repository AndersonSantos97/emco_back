import { Module } from '@nestjs/common';
import { RolService } from './rol.service';
import { RoleEntity } from './rol.entity';
import { RolController } from './rol.controller';
import { TypeOrmModule } from '@nestjs/typeorm';



@Module({
  imports: [
    TypeOrmModule.forFeature([RoleEntity])
  ],

  providers: [RolService],
  
  controllers: [RolController],
  exports: [RolService]
})
export class RolModule {}
