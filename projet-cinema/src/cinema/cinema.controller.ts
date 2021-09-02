import { Body, Controller, Delete, Get, HttpException, HttpStatus, Logger, Param, Patch, Post } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { CinemaDto } from 'src/dtos/cinema.dto';
import { CinemaService } from './cinema.service';
import { CinemaEntity } from './entities/cinema.entity';

@ApiTags('Cinemas')
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
    @ApiOperation({summary: 'Récupérer les cinémas'})
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
    @ApiParam({name: 'cinemaId'})
    @ApiOperation({summary: 'Récupérer un cinéma par id'})
        async getCinemaById(@Param('cinemaId') cinemaId) {
            Logger.log('Recup un cinéma', 'CinemaController');
            const cinema = await this.cinemaService.getCinemaById(cinemaId);
            if(cinema)
                return cinema;
            throw new HttpException('Cinema non trouvé', HttpStatus.NOT_FOUND);
        }

    /**
     * Methode appelant le services pour creer un cinema
     * @param cinemaDto objet cinema
     * @returns retourne le cinema créé
     */
    @Post()
    @ApiOperation({summary: 'Création d\'un cinema'})
        async createCinema(@Body() cinemaDto: CinemaDto): Promise<CinemaEntity>{
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
    @ApiParam({name: 'cinemaId'})
    @ApiBody({ type: CinemaDto})
    @ApiOperation({summary: 'Modification d\'un cinema'})
        async updateCinema(@Param('cinemaId') cinemaId, @Body() cinemaDto){
            Logger.log('Cinema Modifier', 'CinemaController')
            const cinema = await this.cinemaService.updateCinema(cinemaId, cinemaDto);
            if(cinema)
                return cinema;
            throw new HttpException('Cinema non modifié', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    
    /**
     * Methode appelant le services pour supprimer un cinema
     * @param cinemaId L'id du cinema à supprimer
     * @returns 
     */
    @Delete(':cinemaId')
    @ApiParam({name: 'cinemaId'})
    @ApiOperation({summary: 'Suppression d\'un cinema'})
        async remove(@Param('cinemaId') cinemaId){
            Logger.log('Cinéma supprimer', 'CinemaController');
            const cinema = await this.cinemaService.removeCinema(cinemaId);
            if(cinema)
                return cinema;
            throw new HttpException('Cinema non trouvé', HttpStatus.NOT_FOUND);
        }
        
}
