import { ApiProperty } from "@nestjs/swagger";

export class SalleDto {

    @ApiProperty()
    numero: number;

    @ApiProperty()
    nbPlaces: number;

}