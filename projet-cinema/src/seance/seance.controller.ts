import { Controller, Delete, Get, Logger, Param, Patch, Post } from '@nestjs/common';

@Controller('seance')
export class SeanceController {

    @Get()
        getSeances() {
            Logger.log('Récupérer toutes les séances', 'SeanceController');
            return [];
        }
    
    @Get(':seanceId')
        getSeanceById(@Param('seanceId') seanceId) {
            Logger.log('Récupérer une séance', 'SeanceController');
            return seanceId;
        }

    @Post()
        createSeance() {
            Logger.log('Créer une séance', 'SeanceController');
            return 'Seance créée';
        }

    @Patch(':seanceId')
        updateSeance(@Param('seanceId') seanceId) {
            Logger.log('Modifier une seance', 'SeanceController');
            return 'Seance modifiée';
        }

    @Delete(':seanceId')
        removeSeance(@Param('seanceId') seanceId) {
            Logger.log('Supprimer une seance', 'SeanceController');
            return 'Seance supprimer';
        }
}
