import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CinemaService } from 'src/cinema/cinema.service';
import { SalleDto } from 'src/dtos/salle.dto';
import { Repository } from 'typeorm';
import { SalleEntity } from './entities/salle.entity';

@Injectable()
export class SalleService {

    constructor(
        @InjectRepository(SalleEntity)
        private readonly salleRepository: Repository<SalleEntity>,
        private cinemaService : CinemaService
    ){}

    /**
     * Methode pour récupérer toutes les salles
     * @returns toutes les salles
     */
    getSalle() {
        return this.salleRepository.find({relations : ['cinema']});
    }

    /**
     * Methode pour récupérer une salle en fonction de l'id
     * @param salleId Id de la salle recherchée
     * @returns retourne la salle trouvée
     */
    async getSalleById(salleId: number) {
        const salle = await this.salleRepository.findOne(salleId, {relations : ['cinema']});
        if(salle)
            return salle;
        return null;
    }

    /**
     * Methode pour récupérer une salle en fonction de l'id d'un cinema
     * @param cinemaId Id du cinema
     * @returns retourne la salle trouvé
     */
    async getSalleByCinema(cinemaId: number){
        const cinema = await this.cinemaService.getCinemaById(cinemaId)
        if(!cinema)
            return null;
        return this.salleRepository.find({ where : {'cinema' : cinemaId}, relations: ['cinema']});
    }

    /**
     * Methode pour créer une nouvelle salle
     * @param cinemaId Cinema dont la salle fait partie
     * @param salleDto information salle
     * @returns la salle enregistrée
     */
    async createSalle(cinemaId: number, salleDto: SalleDto) {
        const cinema = await this.cinemaService.getCinemaById(cinemaId);
        if(!cinema)
            return null;
        const salle = new SalleEntity();
        salle.numero = salleDto.numero;
        salle.nbPlaces = salleDto.nbPlaces;
        salle.cinema = cinema;
        return this.salleRepository.save(salle);
    }
    
    /**
     * Methode pour modifier une salle
     * @param salleId Id de la salle à modifier
     * @param salleDto Modification à apporter
     * @returns Retourne la salle modifié
     */
    async updateSalle(salleId: number, salleDto: SalleDto){
        const salle = await this.salleRepository.findOne(salleId)
        if(!salle)
            return null;
        await this.salleRepository.update(salleId, salleDto);
        return await this.salleRepository.findOne(salleId, {relations : ['cinema']});
    }

    /**
     * Methode pour supprimer une salle
     * @param salleId Id de la salle à supprimer
     * @returns retourne la salle supprimé 
     */
    async removeSalle(salleId: number){
        const salle = await this.salleRepository.findOne(salleId);
        if(!salle)
            return null;
        this.salleRepository.remove(salle);
        return salle;
    }
}
