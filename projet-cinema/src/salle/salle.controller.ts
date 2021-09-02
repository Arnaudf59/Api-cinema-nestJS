import { Body, Controller, Delete, Get, HttpException, HttpStatus, Logger, Param, Patch, Post } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { SalleDto } from 'src/dtos/salle.dto';
import { SalleEntity } from './entities/salle.entity';
import { SalleService } from './salle.service';

@ApiTags("Salles")
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
    @ApiOperation({summary: 'Récupérer toutes les salles'})
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
    @ApiParam({name: 'salleId'})
    @ApiOperation({summary: 'Récupérer une salle'})
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
    @ApiParam({name: 'cinemaId'})
    @ApiOperation({summary: 'Récupérer toutes les salles d\'un cinéma'})
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
    @ApiParam({name: 'cinemaId'})
    @ApiOperation({summary: 'Création d\'une salle'})
        async createSalle(@Param('cinemaId') cinemaId,@Body() salleDto: SalleDto): Promise<SalleEntity> {
            Logger.log('Créer une salle', 'SalleController');
            const salle = await this.salleService.createSalle(cinemaId, salleDto);
            if(salle)
                return salle;
            throw new HttpException('Cinema non trouvé', HttpStatus.NOT_FOUND);
        }

    /**
     * Methode modification d'une salle
     * @param salleId Salle à modifier
     * @param salleDto information à modifier
     * @returns return la salle modifiée
     */
    @Patch(':salleId')
    @ApiParam({name: "salleId"})
    @ApiBody({type: SalleDto})
    @ApiOperation({summary: 'Modification d\'une salle'})
        async updateSalle(@Param('salleId') salleId, @Body() salleDto) {
            Logger.log('Modifier une Salle', 'SalleController');
            const salle = await this.salleService.updateSalle(salleId, salleDto);
            if(salle)
                return salle;
            throw new HttpException('Salle non modifié', HttpStatus.NOT_FOUND);
        }

    /**
     * Methode pour appeler le service salle et supprimer une salle
     * @param salleId Id de la salle à supprimer
     * @returns retourne la salle à supprimer
     */
    @Delete(':salleId')
    @ApiParam({name: "salleId"})
    @ApiOperation({summary: 'Suppression d\'une salle'})
        async remove(@Param('salleId') salleId) {
            Logger.log('Supprimer une salle', 'SalleController');
            const salle = await this.salleService.removeSalle(salleId);
            if(salle)
                return salle;
            throw new HttpException('Salle non supprimé', HttpStatus.NOT_FOUND);
        }
}
