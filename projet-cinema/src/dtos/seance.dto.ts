import { ApiProperty } from "@nestjs/swagger";

export class SeanceDto {

    @ApiProperty()
    date: Date;
}