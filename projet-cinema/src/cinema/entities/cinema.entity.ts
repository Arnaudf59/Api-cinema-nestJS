import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'

@Entity('cinemas')
export class CinemaEntity {

    @PrimaryGeneratedColumn({name : 'cinema_id'})
    id: number;
    
    @Column()
    nom: string
}