import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CinemaModule } from './cinema/cinema.module';
import { SalleModule } from './salle/salle.module';
@Module({
  imports: [
    CinemaModule,
    TypeOrmModule.forRoot(),
    SalleModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
