import { Body, Controller, Delete, Get, HttpException, HttpStatus, Logger, Param, Patch, Post } from '@nestjs/common';
import { SalleDto } from 'src/dtos/salle.dto';
import { SalleService } from './salle.service';

@Controller('salle')
export class SalleController {

    constructor(
        private readonly salleService: SalleService
    ){}

    @Get()
        getSalles(){
            Logger.log('Récupérer toutes les salles', 'SalleController');
            return this.salleService.getSalle();
        }
    
    @Get(':salleId')
        async getSalleById(@Param('salleId') salleId) {
            Logger.log('Récupérer une salles', 'SalleController');
            const salle = await this.salleService.getSalleById(salleId);
            if(salle)
                return salle;
            throw new HttpException('Salle non trouvé', HttpStatus.NOT_FOUND);
        }

    @Get('/cinema/:cinemaId')
        async getSalleByCinema(@Param('cinemaId') cinemaId) {
            Logger.log('Recupère les salle du cinéma', 'SalleController');
            const salle = await this.salleService.getSalleByCinema(cinemaId);
            if(salle)
                return salle;
                throw new HttpException('Salle non trouvé', HttpStatus.NOT_FOUND);
        }

    @Post(':cinemaId')
        async createSalle(@Param('cinemaId') cinemaId,@Body() salleDto: SalleDto) {
            Logger.log('Créer une salle', 'SalleController');
            const salle = await this.salleService.createSalle(cinemaId, salleDto);
            if(salle)
                return salle;
                throw new HttpException('Salle non trouvé', HttpStatus.NOT_FOUND);
        }

    @Patch(':salleId')
        async updateSalle(@Param('salleId') salleId, @Body() salleDto) {
            Logger.log('Modifier une Salle', 'SalleController');
            const salle = await this.salleService.updateSalle(salleId, salleDto);
            if(salle)
                return salle;
            throw new HttpException('Salle non modifié', HttpStatus.NOT_MODIFIED);
        }

    @Delete(':salleId')
        async remove(@Param('salleId') salleId) {
            Logger.log('Supprimer une salle', 'SalleController');
            const salle = await this.salleService.removeSalle(salleId);
            if(salle)
                return salle;
                throw new HttpException('Salle non trouvé', HttpStatus.NOT_FOUND);
        }
}
