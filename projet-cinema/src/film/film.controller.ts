import { Body, Controller, Delete, Get, HttpException, HttpStatus, Logger, Param, Patch, Post } from '@nestjs/common';
import { FilmDto } from 'src/dtos/film.dto';
import { FilmService } from './film.service';

@Controller('film')
export class FilmController {

    constructor(
        private readonly filmService: FilmService
    ){}

    /**
     * Methode pour appeler le service Film et obtenir tous les films
     * @returns retourne tous les films
     */
    @Get()
        getFilms() {
            Logger.log('Récupérer tous les films', 'FilmController');
            return this.filmService.getFilms();
        }
    
    /**
     * Methode pour appeler le service Film et obtenir un film
     * @param filmId Id du film à recupérer
     * @returns retourne le film voulu
     */
    @Get(':filmId') 
        async getFilmById(@Param('filmId') filmId) {
            Logger.log('Récupére un film', 'FilmController');
            const film = await this.filmService.getFilmsById(filmId);
            if(film)
                return film;
            throw new HttpException('Film non trouvé', HttpStatus.NOT_FOUND);
        }

    /**
     * Methode pour appeler le service et obtenir les film par cinema
     * @param cinemaId Id du cinema dont on veut récuperer les films
     * @returns retournes les films du cinemma avec des seances prevues
     */
    @Get('/cinema/:cinemaId')
        async getFilmByCinema(@Param('cinemaId') cinemaId) {
            Logger.log('Récuépre les film par cinema', 'FilmCintroller');
            const films = await this.filmService.getFilmByCinema(cinemaId);
            if(films)
                return films;
            throw new HttpException('Film non trouvé', HttpStatus.NOT_FOUND);
        }

    /**
     * Methode pour appeler le service et obtenir les film par cinema avec des seance prevu
     * @param cinemaId Id du cinema dont on veut récuperer les films
     * @returns retournes les films du cinema avec des seances prevu
     */
    @Get('/cinema/:cinemaId/date')
        async getFilmByCinemaWithSeance(@Param('cinemaId') cinemaId) {
            Logger.log('Récuépre les film par cinema avec des seances prevu', 'FilmCintroller');
            const films = await this.filmService.getFilmByCinemaWithSeance(cinemaId);
            if(films)
                return films;
            throw new HttpException('Film non trouvé', HttpStatus.NOT_FOUND);
        }

    /**
     * Methode pour créer un nouveau film
     * @param filmDto Information du nouveau film
     * @returns retourne le film créé
     */
    @Post()
        async createFilm(@Body() filmDto: FilmDto){
            Logger.log('Créer un Film', 'FilmController');
            const film = await this.filmService.createFilm(filmDto);
            if(film)
                return film;
                throw new HttpException('Film non créer', HttpStatus.NOT_MODIFIED);
        }

    /**
     * Methode pour modifier un film
     * @param filmId Id du film à modifier
     * @param filmDto Information à modifier 
     * @returns Retourne le film modifié
     */
    @Patch(':filmId')
        async updateFilm(@Param('filmId') filmId, @Body() filmDto) {
            Logger.log('Film modifié', 'FilmController');
            const film = await this.filmService.updateFilm(filmId, filmDto);
            if(film)
                return film;
                throw new HttpException('Film non modifier', HttpStatus.NOT_MODIFIED);
        }

    /**
     * Methode pour supprimer un film
     * @param filmId Id du film à supprimer
     * @returns
     */
    @Delete(':filmId')
        async removeFilm(@Param('filmId') filmId) {
            Logger.log('Film Supprimé', 'FilmController');
            const film = await this.filmService.removeFilm(filmId);
            if(film)
                return film;
            throw new HttpException('Film non trouvé', HttpStatus.NOT_FOUND);
            
        }
}
