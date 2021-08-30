import { Body, Controller, Get, HttpException, HttpStatus, Logger, Param, Post } from '@nestjs/common';
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

    @Post(':cinemaId')
        async createSalle(@Param('cinemaId') cinemaId,@Body() salleDto: SalleDto) {
            Logger.log('Créer une salle', 'SalleController');
            const salle = await this.salleService.createSalle(cinemaId, salleDto);
            if(salle)
                return salle;
                throw new HttpException('Salle non ajouté', HttpStatus.NOT_MODIFIED);
        }
}
