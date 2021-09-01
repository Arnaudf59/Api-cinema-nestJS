import { Body, Controller, Delete, Get, HttpException, HttpStatus, Logger, Param, Patch, Post } from '@nestjs/common';
import { SeanceDto } from 'src/dtos/seance.dto';
import { SeanceService } from './seance.service';

@Controller('seance')
export class SeanceController {

    constructor(
        private readonly seanceService: SeanceService
    ){}

    /**
     * Methode qui appelle le service seance pour récuperer toutes les seances
     * @returns toutes les seances
     */
    @Get()
        getSeances() {
            Logger.log('Récupérer toutes les séances', 'SeanceController');
            return this.seanceService.getSeances();
        }
    
    /**
     * Methode qui appelle le service seance pour récuperer une seance 
     * @param seanceId Id de la seance rechercher
     * @returns retourne la seance rechercher
     */
    @Get(':seanceId') 
        async getFilmById(@Param('seanceId') seanceId) {
            Logger.log('Récupére une seance', 'SeanceController');
            const seance = await this.seanceService.getSeanceById(seanceId);
            if(seance)
                return seance;
            throw new HttpException('Seance non trouvé', HttpStatus.NOT_FOUND);
        }

    /**
     * Methode qui appelle le service seance pour Créer une nouvelle seance
     * @param cinemaId Id du cinema ou se passe la seance
     * @param salleId Id de la salle ou est diffusé le film
     * @param filmId Id du film qui est diffusé
     * @param seanceDto reste des infos de seances
     * @returns return la seance créé
     */
    @Post('/cinema/:cinemaId/salle/:salleId/film/:filmId')
        async createSeance(@Param('cinemaId') cinemaId, @Param('salleId') salleId, @Param('filmId') filmId, @Body() seanceDto: SeanceDto) {
            Logger.log('Créer une séance', 'SeanceController');
            const seance = await this.seanceService.postSeance(cinemaId, salleId, filmId, seanceDto);
            if(seance)
                return seance;
            throw new HttpException('Seance non modifié (vérifier id du cinema, de la salle ou du film)', HttpStatus.NOT_FOUND);
        }

    /**
     * Methode qui appelle le service seance pour modifier une seance
     * @param seanceId Id de la seance à modifier
     * @param SeanceDto Information à modifier
     * @returns retourne la seance modifié
     */
    @Patch(':seanceId')
        async updateSeance(@Param('seanceId') seanceId, @Body() SeanceDto) {
            Logger.log('Modifier une seance', 'SeanceController');
            const seance = await this.seanceService.updateSeance(seanceId, SeanceDto);
            if(seance)
                return seance;
            throw new HttpException('Seance non modifié', HttpStatus.BAD_REQUEST);
        }

    /**
     * Methode qui appelle le service seance pour supprimer une seance
     * @param seanceId Id de la seance à supprimer
     * @returns 
     */
    @Delete(':seanceId')
        async removeSeance(@Param('seanceId') seanceId) {
            Logger.log('Supprimer une seance', 'SeanceController');
            const seance = await this.seanceService.removeSeance(seanceId);
            if(seance)
                return seance;
            throw new HttpException('Seance non trouvé', HttpStatus.NOT_FOUND);
        }
}
