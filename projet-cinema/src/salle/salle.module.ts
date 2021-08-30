import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CinemaModule } from 'src/cinema/cinema.module';
import { CinemaEntity } from 'src/cinema/entities/cinema.entity';
import { SalleEntity } from './entities/salle.entity';
import { SalleController } from './salle.controller';
import { SalleService } from './salle.service';

@Module({
  imports: [CinemaModule, TypeOrmModule.forFeature([SalleEntity, CinemaEntity])],
  controllers: [SalleController],
  providers: [SalleService],
  exports: [SalleService]
})
export class SalleModule {}
