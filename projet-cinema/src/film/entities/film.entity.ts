import { SeanceEntity } from "src/seance/entities/seance.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('films')
export class FilmEntity {

    @PrimaryGeneratedColumn({name : 'film_id'})
    id: Number;

    @Column()
    nom : string;

    @Column({type: 'int'})
    duree : Number;

    @OneToMany(type => SeanceEntity, seance => seance.film)
    seances : SeanceEntity[];

}