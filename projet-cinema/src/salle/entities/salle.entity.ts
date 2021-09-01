import { CinemaEntity } from "src/cinema/entities/cinema.entity";
import { SeanceEntity } from "src/seance/entities/seance.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, Unique } from "typeorm";

@Entity('salles')
@Unique("UQ_NAMES", ["numero", "cinema"])
export class SalleEntity {

    @PrimaryGeneratedColumn({name : 'salle_id'})
    id: number;

    @Column({type: 'int'})
    numero : number;

    @Column({type: 'int'})
    nbPlaces: number;

    @ManyToOne(type => CinemaEntity, cinema => cinema.salles, {onDelete: 'CASCADE'})
    cinema : CinemaEntity;

    @OneToMany(type => SeanceEntity, seance => seance.salle)
    seances : SeanceEntity[];
}