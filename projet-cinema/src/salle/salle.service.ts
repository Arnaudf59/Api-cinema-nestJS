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

    async getSalleByCinema(cinemaId: number){
        const cinema = await this.cinemaService.getCinemaById(cinemaId)
        if(!cinema)
            return null;
        return this.salleRepository.find({ where : {'cinema' : cinemaId}, relations: ['cinema']});
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
    
    async updateSalle(salleId: number, salleDto: SalleDto){
        const salle = await this.salleRepository.findOne(salleId)
        if(!salle)
            return null;
        await this.salleRepository.update(salleId, salleDto);
        return await this.salleRepository.findOne(salleId, {relations : ['cinema']});
    }

    async removeSalle(salleId: number){
        const salle = await this.salleRepository.findOne(salleId);
        if(!salle)
            return null;
        this.salleRepository.remove(salle);
        return salle;
    }
}
