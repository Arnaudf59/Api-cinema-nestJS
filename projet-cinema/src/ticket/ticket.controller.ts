import { Controller, Get, HttpException, HttpStatus, Param } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { SeanceService } from 'src/seance/seance.service';

@ApiTags('Tickets')
@Controller('ticket')
export class TicketController {

    constructor(
        private seanceService: SeanceService
    ){}

    /**
     * Methode permettant de générer un ticket
     * @param seanceId Id de la séance choisi
     * @returns retourne un ticket
     */
    @Get(':seanceId')
    @ApiParam({name: "seanceId"})
    @ApiOperation({summary: 'Création d\'un ticket'})
        async getTicket(@Param('seanceId') seanceId){
            const seance = await this.seanceService.getSeanceById(seanceId);
            if(!seance)
                throw new HttpException('Seance non trouvée (ticket non créé)', HttpStatus.NOT_FOUND);
            let ticket = {
                "cinema" : "cinema : "+seance.cinema.nom,
                "film" : "film : "+seance.film.nom,
                "duree" : "durée : "+seance.film.duree+" min",
                "salle" : "salle n° : "+seance.salle.numero,
                "seance" : "date de la scéance : "+seance.date
            };
            return ticket;
        }
}
