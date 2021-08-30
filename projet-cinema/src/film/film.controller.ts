import { Body, Controller, Delete, Get, Logger, Param, Patch, Post } from '@nestjs/common';

@Controller('film')
export class FilmController {

    @Get()
        getFilms() {
            Logger.log('Récupérer tous les films', 'FilmController');
            return [];
        }
    
    @Get(':filmId') 
        getFilmById(@Param('filmId') filmId) {
            Logger.log('Récupére un film', 'FilmController');
            return filmId;
        }

    @Post()
        createFilm(@Body() filmDto){
            Logger.log('Créer un Film', 'FilmController');
            return 'Film créer';
        }

    @Patch(':filmId')
        updateFilm(@Param('filmId') filmId, @Body() flimDto) {
            Logger.log('Film modifié', 'FilmController');
            return 'Film Modifié';
        }

    @Delete(':filmId')
        removeFilm(@Param('filmId') filmId) {
            Logger.log('Film Supprimé', 'FilmController');
            return 'Flim Supprimé'
        }
}
