import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CinemaEntity } from 'src/cinema/entities/cinema.entity';
import { FilmEntity } from 'src/film/entities/film.entity';
import { SalleEntity } from 'src/salle/entities/salle.entity';
import { SeanceEntity } from 'src/seance/entities/seance.entity';
import { SeanceModule } from 'src/seance/seance.module';
import { TicketController } from './ticket.controller';

@Module({
  imports: [
    SeanceModule, 
    TypeOrmModule.forFeature([
      SeanceEntity, 
      CinemaEntity, 
      SalleEntity, 
      FilmEntity
    ])
  ],
  controllers: [TicketController]
})
export class TicketModule {}
