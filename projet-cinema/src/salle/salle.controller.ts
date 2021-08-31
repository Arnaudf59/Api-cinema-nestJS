import { Body, Controller, Delete, Get, HttpException, HttpStatus, Logger, Param, Patch, Post } from '@nestjs/common';
import { SalleDto } from 'src/dtos/salle.dto';
import { SalleService } from './salle.service';

@Controller('salle')
export class SalleController {

    constructor(
        private readonly salleService: SalleService
    ){}

    /**
     * Methode pour appeler le service salle et récupérer toutes les salles
     * @returns retourne toutes les salles
     */
    @Get()
        getSalles(){
            Logger.log('Récupérer toutes les salles', 'SalleController');
            return this.salleService.getSalle();
        }
    
    /**
     * Methode pour appeler le service salle est recuperé une salle
     * @param salleId Id de la salle rechercher
     * @returns retourne la salle recherchée
     */
    @Get(':salleId')
        async getSalleById(@Param('salleId') salleId) {
            Logger.log('Récupérer une salle', 'SalleController');
            const salle = await this.salleService.getSalleById(salleId);
            if(salle)
                return salle;
            throw new HttpException('Salle non trouvé', HttpStatus.NOT_FOUND);
        }

    /**
     * Methode pour appeler le service salle est recuperé une salle en fonction d'un cinema
     * @param cinemaId Id du cinema 
     * @returns retourne la salle recherchée
     */
    @Get('/cinema/:cinemaId')
        async getSalleByCinema(@Param('cinemaId') cinemaId) {
            Logger.log('Recupère les salle du cinéma', 'SalleController');
            const salle = await this.salleService.getSalleByCinema(cinemaId);
            if(salle)
                return salle;
                throw new HttpException('Salle non trouvé', HttpStatus.NOT_FOUND);
        }

    /**
     * Methode pour créer une salle 
     * @param cinemaId Id du cinema au quelle appartient la salle
     * @param salleDto Information sur la salle
     * @returns retourne la ssalle créé
     */
    @Post(':cinemaId')
        async createSalle(@Param('cinemaId') cinemaId,@Body() salleDto: SalleDto) {
            Logger.log('Créer une salle', 'SalleController');
            const salle = await this.salleService.createSalle(cinemaId, salleDto);
            if(salle)
                return salle;
                throw new HttpException('Salle non trouvé', HttpStatus.NOT_FOUND);
        }

    /**
     * Methode modification d'une salle
     * @param salleId Salle à modifier
     * @param salleDto information à modifier
     * @returns return la salle modifiée
     */
    @Patch(':salleId')
        async updateSalle(@Param('salleId') salleId, @Body() salleDto) {
            Logger.log('Modifier une Salle', 'SalleController');
            const salle = await this.salleService.updateSalle(salleId, salleDto);
            if(salle)
                return salle;
            throw new HttpException('Salle non modifié', HttpStatus.NOT_MODIFIED);
        }

    /**
     * Methode pour appeler le service salle et supprimer une salle
     * @param salleId Id de la salle à supprimer
     * @returns retourne la salle à supprimer
     */
    @Delete(':salleId')
        async remove(@Param('salleId') salleId) {
            Logger.log('Supprimer une salle', 'SalleController');
            const salle = await this.salleService.removeSalle(salleId);
            if(salle)
                return salle;
                throw new HttpException('Salle non trouvé', HttpStatus.NOT_FOUND);
        }
}
