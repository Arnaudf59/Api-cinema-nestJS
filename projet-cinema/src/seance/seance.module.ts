import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SeanceEntity } from './entities/seance.entity';
import { SeanceController } from './seance.controller';

@Module({
  imports: [TypeOrmModule.forFeature([SeanceEntity])],
  controllers: [SeanceController]
})
export class SeanceModule {}
