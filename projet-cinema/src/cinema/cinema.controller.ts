import { Body, Controller, Delete, Get, Logger, Param, Patch, Post } from '@nestjs/common';

@Controller('cinema')
export class CinemaController {

    @Get()
        getCinema() {
            Logger.log('Recup tous les cinéma', 'CinemaController');
            return [];
        }
    
    @Get(':cinemaId')
        getCinemaById(@Param('cinemaId') cinemaId) {
            Logger.log('Recup tous les cinéma', 'CinemaController');
            return cinemaId;
        }

    @Post()
        createCinema(@Body() cinemaDto: number){
            Logger.log('Création cinéma', 'CinemaController');
            return 'Création cinéma';
        }
    
    @Patch(':cinemaId')
        updateCinema(@Param('cinemaId') cinemaId, @Body() cinemaDto){
            Logger.log('Cinema Modifier', 'CinemaController')
            return 'Modification du cinéma'
        }
    
    @Delete(':cinemaId')
        remove(@Param('cinemaId') cinemaId){
            Logger.log('Cinéma supprimer', 'CinemaController');
            return 'Suppression Du cinema';
        }
        
}
