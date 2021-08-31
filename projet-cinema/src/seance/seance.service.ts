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

    getSeances() {
        return this.seanceRepository.find();
    }

    async getSeanceById(seanceId: number) {
        const seance = this.seanceRepository.findOne(seanceId);
        if(seance)
            return seance;
        return null;
    }

    //Vérifier si la salle est bien dans le bon cinéma
    async postSeance(cinemaId: number, salleId: number, filmId: number, seanceDto: SeanceDto) {
        const cinema = await this.cinemaService.getCinemaById(cinemaId)
        if(!cinema)
            return cinema;
        const salle = await this.salleService.getSalleById(salleId)
        if(!salle)
            return null;
        else if(cinema.id != salle.cinema.id)
            return null;
        const film = await this.filmService.getFilmsById(filmId)
        if(!film)
            return null;
        const seance = new SeanceEntity();
        seance.date = seanceDto.date;
        seance.cinema = cinema;
        seance.salle = salle;
        seance.film = film;
        return this.seanceRepository.save(seance);
    }

    async updateSeance(seanceId: number, seanceDto: SeanceDto) {
        const seance = await this.seanceRepository.findOne(seanceId);
        if(!seance)
            return null;
        await this.seanceRepository.update(seanceId, seanceDto);
        const seanceModif = await this.seanceRepository.findOne(seanceId, {relations : ['cinema', 'salle', 'film']});
        const salle = await this.salleService.getSalleById(seanceModif.salle.id);
        if(seanceModif.cinema.id == salle.cinema.id)
            return seanceModif
        const newSeance = {
            "cinema" : {
                "id" : salle.cinema.id,
                "nom" : salle.cinema.nom
            }
        }
        await this.seanceRepository.update(seanceId, newSeance);
        return await this.seanceRepository.findOne(seanceId, {relations : ['cinema', 'salle', 'film']});
    }

    async removeSeance(seanceId: number){
        const seance = await this.seanceRepository.findOne(seanceId)
        if(!seance) 
            return null;
        this.seanceRepository.remove(seance);
        return seance;
    }
}
