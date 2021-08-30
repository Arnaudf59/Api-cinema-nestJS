import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FilmEntity } from './entities/film.entity';
import { FilmController } from './film.controller';
import { FilmService } from './film.service';

@Module({
  imports: [TypeOrmModule.forFeature([FilmEntity])],
  controllers: [FilmController],
  providers: [FilmService],
  exports: [FilmService]
})
export class FilmModule {}
