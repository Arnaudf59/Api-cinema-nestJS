import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SalleEntity } from 'src/salle/entities/salle.entity';
import { SalleController } from 'src/salle/salle.controller';
import { SalleService } from 'src/salle/salle.service';
import { CinemaController } from './cinema.controller';
import { CinemaService } from './cinema.service';
import { CinemaEntity } from './entities/cinema.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CinemaEntity, SalleEntity])],
  controllers: [CinemaController],
  providers: [CinemaService],
  exports: [CinemaService]
})
export class CinemaModule {}
