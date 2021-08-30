import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FilmDto } from 'src/dtos/film.dto';
import { Repository } from 'typeorm';
import { FilmEntity } from './entities/film.entity';

@Injectable()
export class FilmService {

    constructor(
        @InjectRepository(FilmEntity)
        private readonly filmRepository : Repository<FilmEntity>
    ){}

    getFilms() {
        return this.filmRepository.find();
    }

    async getFilmsById(filmId: number) {
        const film = await this.filmRepository.findOne(filmId);
        if(film)
            return film;
        return null;
    }

    async createFilm(filmDto : FilmDto) {
        const film = await this.filmRepository.save(filmDto);
        return film;
    }

    async updateFilm(filmId: number, filmDto: FilmDto) {
        const film = await this.filmRepository.findOne(filmId);
        if(!film)
            return null;
        await this.filmRepository.update(filmId, filmDto);
        return await this.filmRepository.findOne(filmId);
    }

    async removeFilm(filmId: number) {
        const film = await this.filmRepository.findOne(filmId);
        if(!film)
            return null
        this.filmRepository.remove(film);
        return film;
    }





}
