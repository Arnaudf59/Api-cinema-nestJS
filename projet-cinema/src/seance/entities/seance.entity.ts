import { CinemaEntity } from "src/cinema/entities/cinema.entity";
import { FilmEntity } from "src/film/entities/film.entity";
import { SalleEntity } from "src/salle/entities/salle.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('seances')
export class SeanceEntity {

    @PrimaryGeneratedColumn({name : 'seance_id'})
    id: Number;

    @Column({type: 'timestamp'})
    date: Date;

    @ManyToOne(type => CinemaEntity, cinema => cinema.seances, {onDelete: 'CASCADE'})
    cinema : CinemaEntity;

    @ManyToOne(type => SalleEntity, salle => salle.seances, {onDelete: 'CASCADE'})
    salle : SalleEntity;

    @ManyToOne(type => FilmEntity, film => film.seances, {onDelete: 'CASCADE'})
    film : FilmEntity;

}