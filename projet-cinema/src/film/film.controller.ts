import { Body, Controller, Delete, Get, HttpException, HttpStatus, Logger, Param, Patch, Post } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { FilmDto } from 'src/dtos/film.dto';
import { FilmEntity } from './entities/film.entity';
import { FilmService } from './film.service';

@ApiTags("Films")
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
    @ApiOperation({summary: 'Récupérer tous les films'})
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
    @ApiParam({name: "filmId"})
    @ApiOperation({summary: 'Récupérer un film'}) 
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
    @ApiParam({name: 'cinemaId'})
    @ApiOperation({summary : "Chercher un film présent dans ce cinema"})
        async getFilmByCinema(@Param('cinemaId') cinemaId) {
            Logger.log('Récuépre les film par cinema', 'FilmCintroller');
            const films = await this.filmService.getFilmByCinema(cinemaId);
            if(films)
                return films;
            throw new HttpException('Film ou cinema non trouvée', HttpStatus.NOT_FOUND);
        }
        
    @Get('/cinema/:cinemaId/limit/:limit/offset/:offset')
    @ApiParam({name: 'cinemaId'})
    @ApiParam({name: 'limit'})
    @ApiParam({name: 'offset'})
    @ApiOperation({summary : "Chercher un film présent dans ce cinema avec pagination"})
        async getFilmByCinemaPagination(@Param('cinemaId') cinemaId, @Param('limit') limit, @Param('offset') offset) {
            Logger.log('Récuépre les film par cinema', 'FilmCintroller');
            const films = await this.filmService.getFilmByCinemaPagination(cinemaId, limit, offset);
            if(films)
                return films;
            throw new HttpException('Film ou cinema non trouvée', HttpStatus.NOT_FOUND);
        }

    /**
     * Methode pour appeler le service et obtenir les film par cinema avec des seance prevu
     * @param cinemaId Id du cinema dont on veut récuperer les films
     * @returns retournes les films du cinema avec des seances prevu
     */
    @Get('/cinema/:cinemaId/date')
    @ApiParam({name: 'cinemaId'})
    @ApiOperation({summary : "Chercher un film présent dans ce cinema avec une séance prévu"})
        async getFilmByCinemaWithSeance(@Param('cinemaId') cinemaId) {
            Logger.log('Récuépre les film par cinema avec des seances prevu', 'FilmCintroller');
            const films = await this.filmService.getFilmByCinemaWithSeance(cinemaId);
            if(films)
                return films;
            throw new HttpException('Film ou Cinema non trouvés', HttpStatus.NOT_FOUND);
        }

    /**
     * Methode pour créer un nouveau film
     * @param filmDto Information du nouveau film
     * @returns retourne le film créé
     */
    @Post()
    @ApiOperation({summary: 'Création d\'un film'})
        async createFilm(@Body() filmDto: FilmDto): Promise<FilmEntity>{
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
    @ApiParam({name: "filmId"})
    @ApiBody({type : FilmDto})
    @ApiOperation({summary: 'Modification d\'un film'})
        async updateFilm(@Param('filmId') filmId, @Body() filmDto) {
            Logger.log('Film modifié', 'FilmController');
            const film = await this.filmService.updateFilm(filmId, filmDto);
            if(film)
                return film;
            throw new HttpException('Film non modifié', HttpStatus.NOT_FOUND);
        }

    /**
     * Methode pour supprimer un film
     * @param filmId Id du film à supprimer
     * @returns
     */
    @Delete(':filmId')
    @ApiParam({name: "filmId"})
    @ApiOperation({summary: 'Suppression d\'un film'})
        async removeFilm(@Param('filmId') filmId) {
            Logger.log('Film Supprimé', 'FilmController');
            const film = await this.filmService.removeFilm(filmId);
            if(film)
                return film;
            throw new HttpException('Film non trouvé (Film non supprimé)', HttpStatus.NOT_FOUND);
        }
}
