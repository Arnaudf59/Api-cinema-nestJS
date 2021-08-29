import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CinemaModule } from './cinema/cinema.module';
@Module({
  imports: [
    CinemaModule,
    TypeOrmModule.forRoot()
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
