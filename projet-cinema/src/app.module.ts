import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CinemaModule } from './cinema/cinema.module';
import { SalleModule } from './salle/salle.module';
import { FilmModule } from './film/film.module';
import { SeanceModule } from './seance/seance.module';
import { TicketModule } from './ticket/ticket.module';
@Module({
  imports: [
    CinemaModule,
    TypeOrmModule.forRoot(),
    SalleModule,
    FilmModule,
    SeanceModule,
    TicketModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
