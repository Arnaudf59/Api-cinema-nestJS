import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CinemaDto } from 'src/dtos/cinema.dto';
import { Repository } from 'typeorm';
import { CinemaEntity } from './entities/cinema.entity';

@Injectable()
export class CinemaService {

    constructor(
        @InjectRepository(CinemaEntity)
        private readonly cinemaRepository: Repository<CinemaEntity>
    ){}

    /**
     * methode permettant de recuperer tous le cinemas
     * @returns tous les cinémas
     */
    getCinema() {
        return this.cinemaRepository.find({relations : ['salles']});
    }

    /**
     * Methode permettant de recuperer un cinema
     * @param cinemaId Id du cinema à recuperer
     * @returns le cinema selectionné
     */
    async getCinemaById(cinemaId: number) {
        const cinema = await this.cinemaRepository.findOne(cinemaId, {relations : ['salles']});
        if(cinema)
            return cinema;
        return null;
    }

    /**
     * Création d'un cinema
     * @param cinemaDto objet cinema de type Cinema
     * @returns le cinema créé
     */
    async createCinema(cinemaDto : CinemaDto) {
        const cinema = await this.cinemaRepository.save(cinemaDto);
        if(cinema)
            return cinema;
        return null;
    }

    /**
     * Modification d'un cinema
     * @param cinemaId l'id du cinema à modifier
     * @param cinemaDto Les modifications à apporter
     * @returns le cinema modifié
     */
    async updateCinema(cinemaId: number, cinemaDto: CinemaDto){
        const cinema = await this.cinemaRepository.findOne(cinemaId)
        if(cinema){
            await this.cinemaRepository.update(cinemaId, cinemaDto);
            return await this.cinemaRepository.findOne(cinemaId, {relations : ['salles']});
        }
        return null;
        
    }

    /**
     * Supprime un cinema
     * @param cinemaId L'id du cinéma à supprimer
     * @returns le cinema supprimé
     */
    async removeCinema(cinemaId: number){
        const cinema = await this.cinemaRepository.findOne(cinemaId, {relations : ['salles']})
        if(!cinema) 
            return null;
        this.cinemaRepository.remove(cinema);
        return cinema;
    }
}
