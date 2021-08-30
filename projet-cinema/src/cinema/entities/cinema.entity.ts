import { SalleEntity } from 'src/salle/entities/salle.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm'

@Entity('cinemas')
export class CinemaEntity {

    @PrimaryGeneratedColumn({name : 'cinema_id'})
    id: Number;
    
    @Column()
    nom: string

    @OneToMany(type => SalleEntity, salle => salle.cinema)
    salles : SalleEntity[];
}