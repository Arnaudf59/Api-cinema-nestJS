import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CinemaModule } from 'src/cinema/cinema.module';
import { CinemaEntity } from 'src/cinema/entities/cinema.entity';
import { FilmEntity } from 'src/film/entities/film.entity';
import { FilmModule } from 'src/film/film.module';
import { SalleEntity } from 'src/salle/entities/salle.entity';
import { SalleModule } from 'src/salle/salle.module';
import { SeanceEntity } from './entities/seance.entity';
import { SeanceController } from './seance.controller';
import { SeanceService } from './seance.service';

@Module({
  imports: [
    CinemaModule, 
    SalleModule, 
    FilmModule, 
    TypeOrmModule.forFeature([
      SeanceEntity, 
      CinemaEntity, 
      SalleEntity, 
      FilmEntity
    ])
  ],
  controllers: [SeanceController],
  providers: [SeanceService],
  exports : [SeanceService]
})
export class SeanceModule {}
