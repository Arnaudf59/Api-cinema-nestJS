import { Body, Controller, Delete, Get, HttpException, HttpStatus, Logger, Param, Patch, Post } from '@nestjs/common';
import { CinemaDto } from 'src/dtos/cinema.dto';
import { CinemaService } from './cinema.service';

@Controller('cinema')
export class CinemaController {

    constructor(
        private readonly cinemaService: CinemaService
    ){}

    @Get()
        getCinema() {
            Logger.log('Recup tous les cinéma', 'CinemaController');
            return this.cinemaService.getCinema();
        }
    
    @Get(':cinemaId')
        async getCinemaById(@Param('cinemaId') cinemaId) {
            Logger.log('Recup tous les cinéma', 'CinemaController');
            const cinema = await this.cinemaService.getCinemaById(cinemaId);
            if(cinema)
                return cinema;
            throw new HttpException('Article non trouvé', HttpStatus.NOT_FOUND);
        }

    @Post()
        async createCinema(@Body() cinemaDto: CinemaDto){
            Logger.log('Création cinéma', 'CinemaController');
            const cinema = await this.cinemaService.createCinema(cinemaDto);
            if(cinema)
                return cinema;
            throw new HttpException('Cinema non créer', HttpStatus.NOT_MODIFIED);
        }
    
    @Patch(':cinemaId')
        async updateCinema(@Param('cinemaId') cinemaId, @Body() cinemaDto){
            Logger.log('Cinema Modifier', 'CinemaController')
            const cinema = await this.cinemaService.updateCinema(cinemaId, cinemaDto);
            if(cinema)
                return cinema;
            throw new HttpException('Cinema non modifié', HttpStatus.NOT_MODIFIED);
        }
    
    @Delete(':cinemaId')
        async remove(@Param('cinemaId') cinemaId){
            Logger.log('Cinéma supprimer', 'CinemaController');
            const cinema = await this.cinemaService.removeCinema(cinemaId);
            if(cinema)
                return cinema;
            throw new HttpException('Cinema non trouvé', HttpStatus.NOT_FOUND);
        }
        
}
