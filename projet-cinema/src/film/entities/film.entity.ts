import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('films')
export class FilmEntity {

    @PrimaryGeneratedColumn({name : 'film_id'})
    id: Number;

    @Column()
    nom : string;

    @Column({type: 'int'})
    duree : Number

}