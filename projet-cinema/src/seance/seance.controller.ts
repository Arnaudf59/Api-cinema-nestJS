import { Body, Controller, Delete, Get, HttpException, HttpStatus, Logger, Param, Patch, Post } from '@nestjs/common';
import { SeanceDto } from 'src/dtos/seance.dto';
import { SeanceService } from './seance.service';

@Controller('seance')
export class SeanceController {

    constructor(
        private readonly seanceService: SeanceService
    ){}

    @Get()
        getSeances() {
            Logger.log('Récupérer toutes les séances', 'SeanceController');
            return this.seanceService.getSeances();
        }
    
    @Get(':seanceId') 
        async getFilmById(@Param('seanceId') seanceId) {
            Logger.log('Récupére une seance', 'SeanceController');
            const seance = await this.seanceService.getSeanceById(seanceId);
            if(seance)
                return seance;
            throw new HttpException('Seance non trouvé', HttpStatus.NOT_FOUND);
        }

    @Post('/cinema/:cinemaId/salle/:salleId/film/:filmId')
        createSeance(@Param('cinemaId') cinemaId, @Param('salleId') salleId, @Param('filmId') filmId, @Body() seanceDto: SeanceDto) {
            Logger.log('Créer une séance', 'SeanceController');
            const seance = this.seanceService.postSeance(cinemaId, salleId, filmId, seanceDto);
            if(seance)
                return seance;
            throw new HttpException('Seance non trouvé', HttpStatus.NOT_FOUND);
        }

    @Patch(':seanceId')
        async updateSeance(@Param('seanceId') seanceId, @Body() SeanceDto) {
            Logger.log('Modifier une seance', 'SeanceController');
            const seance = await this.seanceService.updateSeance(seanceId, SeanceDto);
            if(seance)
                return seance;
            throw new HttpException('Seance non modifié', HttpStatus.NOT_MODIFIED);
        }

    @Delete(':seanceId')
        async removeSeance(@Param('seanceId') seanceId) {
            Logger.log('Supprimer une seance', 'SeanceController');
            const seance = await this.seanceService.removeSeance(seanceId);
            if(seance)
                return seance;
            throw new HttpException('Seance non trouvé', HttpStatus.NOT_FOUND);
        }
}
