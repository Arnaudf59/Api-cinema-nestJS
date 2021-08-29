import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CinemaController } from './cinema.controller';
import { CinemaService } from './cinema.service';
import { CinemaEntity } from './entities/cinema.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CinemaEntity])],
  controllers: [CinemaController],
  providers: [CinemaService]
})
export class CinemaModule {}
