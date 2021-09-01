import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CinemaService } from 'src/cinema/cinema.service';
import { SeanceDto } from 'src/dtos/seance.dto';
import { FilmService } from 'src/film/film.service';
import { SalleService } from 'src/salle/salle.service';
import { Repository } from 'typeorm';
import { SeanceEntity } from './entities/seance.entity';

@Injectable()
export class SeanceService {
    
    constructor(
        @InjectRepository(SeanceEntity)
        private readonly seanceRepository : Repository<SeanceEntity>,
        private cinemaService : CinemaService,
        private salleService : SalleService,
        private filmService : FilmService
    ){}

    /**
     * Methode pour recupérer toutes les seances
     * @returns retourne toutes les seances
     */
    getSeances() {
        return this.seanceRepository.find({relations : ['cinema', 'salle', 'film']});
    }

    /**
     * Methode pour récuperer une seance 
     * @param seanceId Id de la seance recherchée
     * @returns retourne la seance recherchée
     */
    async getSeanceById(seanceId: number) {
        const seance = this.seanceRepository.findOne(seanceId, {relations : ['cinema', 'salle', 'film']});
        if(seance)
            return seance;
        return null;
    }

    /**
     * Methode pour créer une nouvelle seance
     * @param cinemaId Id du cinema ou se passe la seance 
     * @param salleId Id de la salle ou est diffusé le film
     * @param filmId Id du film qui est diffusé
     * @param seanceDto reste des info pour une seance
     * @returns retourne la seance créer
     */
    async postSeance(cinemaId: number, salleId: number, filmId: number, seanceDto: SeanceDto) {
        //Pour créer une seance, il nous faut un cinema, une salle, et un film
        //On recupere le cinema selectionné
        const cinema = await this.cinemaService.getCinemaById(cinemaId);
        // Si on ne trouve pas le cinema, on s'arrête
        if(!cinema)
            return null;
        // On recupere la salle selectionné
        const salle = await this.salleService.getSalleById(salleId);
        // Si on ne trouve pas la salle, on s'arrête
        if(!salle)
            return null;
        //On verifie que la salle selectionnée appartien bien au cinema selectionné
        else if(cinema.id != salle.cinema.id)
            return null;
        // On recupere le film selectionner
        const film = await this.filmService.getFilmsById(filmId);
        // si il on ne trouve pas le film, on s'arrête
        if(!film)
            return null;
        // Si tous se passe bien, on créer notre objet seance
        const seance = new SeanceEntity();
        seance.date = seanceDto.date;
        seance.cinema = cinema;
        seance.salle = salle;
        seance.film = film;
        // Et on l'enregistre dans notre bdd
        return this.seanceRepository.save(seance);
    }

    /**
     * Methode permettant de modifier une seance
     * @param seanceId Id de la seance à modifier
     * @param seanceDto Info à modifier
     * @returns retourne la seance modifiée
     */
    async updateSeance(seanceId: number, seanceDto: SeanceDto) {
        // On recupère la seance
        const seance = await this.seanceRepository.findOne(seanceId);
        // Si on ne trouve pas la seance, on s'arrête là
        if(!seance)
            return null;
        //On modifie notre seance
        await this.seanceRepository.update(seanceId, seanceDto);
        // on recupère la seance modifié
        const seanceModif = await this.seanceRepository.findOne(seanceId, {relations : ['cinema', 'salle', 'film']});
        //On recupère la salle ou est diffuser la seance
        const salle = await this.salleService.getSalleById(seanceModif.salle.id);
        //On verifie que le cinema qui a été selectionné lors de la seance
        //est le même que le cinema ou se trouve la salle
        if(seanceModif.cinema.id == salle.cinema.id)
            // si les deux correspondent, on peut retourner la seance modifier
            return seanceModif
        // Sinon on modifie le cinema dans la sceance pour le rendre compatible
        const newSeance = {
            "cinema" : {
                "id" : salle.cinema.id,
                "nom" : salle.cinema.nom
            }
        }
        //Puis on remodifie la seance
        await this.seanceRepository.update(seanceId, newSeance);
        //et on la retourne
        return await this.seanceRepository.findOne(seanceId, {relations : ['cinema', 'salle', 'film']});
    }

    /**
     * Methode pour supprimer une seance
     * @param seanceId Id de la seance à supprimer
     * @returns 
     */
    async removeSeance(seanceId: number){
        const seance = await this.seanceRepository.findOne(seanceId)
        if(!seance) 
            return null;
        this.seanceRepository.remove(seance);
        return seance;
    }
}
