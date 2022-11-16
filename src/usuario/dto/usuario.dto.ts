import { IsNotEmpty,  IsString } from "class-validator";
import { ApiProperty } from '@nestjs/swagger';

export class UsuarioDTO{
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    readonly username: string;
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    readonly email: string;
    @ApiProperty()
    readonly password: string;
}