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

    getCinema() {
        return this.cinemaRepository.find();
    }

    async getCinemaById(cinemaId: number) {
        const cinema = await this.cinemaRepository.findOne(cinemaId);
        if(cinema)
            return cinema;
        return null;
    }

    async createCinema(cinemaDto : CinemaDto) {
        const cinema = await this.cinemaRepository.save(cinemaDto);
        return cinema;
    }

    async updateCinema(cinemaId: number, cinemaDto: CinemaDto){
        const cinema = await this.cinemaRepository.findOne(cinemaId)
        if(!cinema)
            return null;
        await this.cinemaRepository.update(cinemaId, cinemaDto);
        return await this.cinemaRepository.findOne(cinemaId);
    }

    async removeCinema(cinemaId: number){
        const cinema = await this.cinemaRepository.findOne(cinemaId)
        if(!cinema) 
            return null;
        this.cinemaRepository.remove(cinema);
        return cinema;
    }
}
