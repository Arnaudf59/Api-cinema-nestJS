import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FilmDto } from 'src/dtos/film.dto';
import { SeanceEntity } from 'src/seance/entities/seance.entity';
import { Repository } from 'typeorm';
import { FilmEntity } from './entities/film.entity';

@Injectable()
export class FilmService {

    constructor(
        @InjectRepository(FilmEntity)
        private readonly filmRepository : Repository<FilmEntity>
    ){}

    /**
     * Methode pour récuperer tous les films
     * @returns Retourne tous les films
     */
    getFilms() {
        return this.filmRepository.find();
    }

    /**
     * Methode pour recuperer un film par id
     * @param filmId id du film recherché
     * @returns return le film trouvé
     */
    async getFilmsById(filmId: number) {
        const film = await this.filmRepository.findOne(filmId);
        if(film)
            return film;
        return null;
    }

    /**
     * Methode permettant de recupérer les film présent dans un cinéma
     * @param cinemaId id du cinema dont on cherhce lees film
     * @returns liste des films 
     */
    async getFilmByCinema(cinemaId: number) {
        const film = await this.filmRepository.createQueryBuilder('films')
        .innerJoinAndMapOne('films.seance', SeanceEntity, 'seances', 'seances.filmId = films.id')
        .where('seances.cinemaId = :cinemaId', {cinemaId: cinemaId})
        .getMany();
        return film;
    }

    /**
     * Methode pour recuperer les films d'un cinema avec des seances prevu
     * @param cinemaId Id du cinema dont on veut les films
     * @returns retourne les films 
     */
    async getFilmByCinemaWithSeance(cinemaId: number) {
        const date = new Date().toISOString();
        const film = await this.filmRepository.createQueryBuilder('films')
        .innerJoinAndMapOne('films.seance', SeanceEntity, 'seances', 'seances.filmId = films.id')
        .where('seances.cinemaId = :cinemaId', {cinemaId: cinemaId})
        .andWhere(`seances.date > "${date}"`, {date: date})
        .getMany();
        if(!film)
            return null;
        return film;
    }

    /**
     * Methode pour créer un film
     * @param filmDto variable de type Film
     * @returns retourne le film créer
     */
    async createFilm(filmDto : FilmDto) {
        const film = await this.filmRepository.save(filmDto);
        return film;
    }

    /**
     * Methode pour modifier un film
     * @param filmId Id du film à modifier
     * @param filmDto Modification à apporter 
     * @returns retourne le film modifié
     */
    async updateFilm(filmId: number, filmDto: FilmDto) {
        const film = await this.filmRepository.findOne(filmId);
        if(!film)
            return null;
        await this.filmRepository.update(filmId, filmDto);
        return await this.filmRepository.findOne(filmId);
    }

    /**
     * Méthode pour Supprimer un film
     * @param filmId Id du film à supprimer
     * @returns retourne le film supprimé
     */
    async removeFilm(filmId: number) {
        const film = await this.filmRepository.findOne(filmId);
        if(!film)
            return null
        this.filmRepository.remove(film);
        return film;
    }





}
