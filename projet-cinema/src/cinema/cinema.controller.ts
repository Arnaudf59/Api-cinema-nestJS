import { Body, Controller, Delete, Get, HttpException, HttpStatus, Logger, Param, Patch, Post } from '@nestjs/common';
import { CinemaDto } from 'src/dtos/cinema.dto';
import { CinemaService } from './cinema.service';

@Controller('cinema')
export class CinemaController {

    constructor(
        private readonly cinemaService: CinemaService
    ){}
    
    /**
     * Methode appelant le services pour recupperer tous les cinemas
     * @returns tous les cinemas
     */
    @Get()
        getCinemas() {
            Logger.log('Recup tous les cinémas', 'CinemaController');
            return this.cinemaService.getCinema();
        }
    
    /**
     * Methode appelant le services pour recupperer un cinema
     * @param cinemaId Id du cinema rechercher
     * @returns le cinema si trouvé
     */
    @Get(':cinemaId')
        async getCinemaById(@Param('cinemaId') cinemaId) {
            Logger.log('Recup un cinéma', 'CinemaController');
            const cinema = await this.cinemaService.getCinemaById(cinemaId);
            if(cinema)
                return cinema;
            throw new HttpException('Article non trouvé', HttpStatus.NOT_FOUND);
        }

    /**
     * Methode appelant le services pour creer un cinema
     * @param cinemaDto objet cinema
     * @returns retourne le cinema créé
     */
    @Post()
        async createCinema(@Body() cinemaDto: CinemaDto){
            Logger.log('Création cinéma', 'CinemaController');
            const cinema = await this.cinemaService.createCinema(cinemaDto);
            if(cinema)
                return cinema;
            throw new HttpException('Cinema non créer', HttpStatus.NOT_FOUND);
        }
    
    /**
     * Methode appelant le services pour modifier un cinema
     * @param cinemaId id du cinema à modifier
     * @param cinemaDto objet cinema
     * @returns retourne le cinema modifié
     */
    @Patch(':cinemaId')
        async updateCinema(@Param('cinemaId') cinemaId, @Body() cinemaDto){
            Logger.log('Cinema Modifier', 'CinemaController')
            const cinema = await this.cinemaService.updateCinema(cinemaId, cinemaDto);
            if(cinema)
                return cinema;
            throw new HttpException('Cinema non modifié', HttpStatus.NOT_MODIFIED);
        }
    
    /**
     * Methode appelant le services pour supprimer un cinema
     * @param cinemaId L'id du cinema à supprimer
     * @returns 
     */
    @Delete(':cinemaId')
        async remove(@Param('cinemaId') cinemaId){
            Logger.log('Cinéma supprimer', 'CinemaController');
            const cinema = await this.cinemaService.removeCinema(cinemaId);
            if(cinema)
                return cinema;
            throw new HttpException('Cinema non trouvé', HttpStatus.NOT_FOUND);
        }
        
}
