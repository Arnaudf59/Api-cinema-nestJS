import { CinemaEntity } from "src/cinema/entities/cinema.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('salles')
export class SalleEntity {

    @PrimaryGeneratedColumn({name : 'salle_id'})
    id: Number;

    @Column({type: 'int'})
    numero : Number;

    @Column({type: 'int'})
    nbPlaces: Number;

    @ManyToOne(type => CinemaEntity, cinema => cinema.salles, {onDelete: 'CASCADE'})
    cinema : CinemaEntity;
}