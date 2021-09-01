import { SalleEntity } from 'src/salle/entities/salle.entity';
import { SeanceEntity } from 'src/seance/entities/seance.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, Unique } from 'typeorm'

@Entity('cinemas')
@Unique(["nom"])
export class CinemaEntity {

    @PrimaryGeneratedColumn({name : 'cinema_id'})
    id: number;
    
    @Column()
    nom: string

    @OneToMany(type => SalleEntity, salle => salle.cinema)
    salles : SalleEntity[];

    @OneToMany(type => SeanceEntity, seance => seance.cinema)
    seances : SeanceEntity[];
}