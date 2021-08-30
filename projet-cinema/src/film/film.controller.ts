import { Body, Controller, Delete, Get, HttpException, HttpStatus, Logger, Param, Patch, Post } from '@nestjs/common';
import { FilmDto } from 'src/dtos/film.dto';
import { FilmService } from './film.service';

@Controller('film')
export class FilmController {

    constructor(
        private readonly filmService: FilmService
    ){}

    @Get()
        getFilms() {
            Logger.log('Récupérer tous les films', 'FilmController');
            return this.filmService.getFilms();
        }
    
    @Get(':filmId') 
        async getFilmById(@Param('filmId') filmId) {
            Logger.log('Récupére un film', 'FilmController');
            const film = await this.filmService.getFilmsById(filmId);
            if(film)
                return film;
            throw new HttpException('Film non trouvé', HttpStatus.NOT_FOUND);
        }

    @Post()
        async createFilm(@Body() filmDto: FilmDto){
            Logger.log('Créer un Film', 'FilmController');
            const film = await this.filmService.createFilm(filmDto);
            if(film)
                return film;
                throw new HttpException('Film non créer', HttpStatus.NOT_MODIFIED);
        }

    @Patch(':filmId')
        async updateFilm(@Param('filmId') filmId, @Body() filmDto) {
            Logger.log('Film modifié', 'FilmController');
            const film = await this.filmService.updateFilm(filmId, filmDto);
            if(film)
                return film;
                throw new HttpException('Film non modifier', HttpStatus.NOT_MODIFIED);
        }

    @Delete(':filmId')
        async removeFilm(@Param('filmId') filmId) {
            Logger.log('Film Supprimé', 'FilmController');
            const film = await this.filmService.removeFilm(filmId);
            if(film)
                return film;
            throw new HttpException('Film non trouvé', HttpStatus.NOT_FOUND);
            
        }
}
