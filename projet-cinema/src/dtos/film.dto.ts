import { ApiProperty } from "@nestjs/swagger";

export class FilmDto {

    @ApiProperty()
    nom :string;

    @ApiProperty()
    duree : Number;
}