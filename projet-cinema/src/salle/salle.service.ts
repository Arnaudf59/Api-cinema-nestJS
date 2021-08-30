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

    getSalle() {
        return this.salleRepository.find({relations : ['cinema']});
    }

    async getSalleById(salleId: number) {
        const salle = await this.salleRepository.findOne(salleId, {relations : ['cinema']});
        if(salle)
            return salle;
        return null;
    }

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
    
}
