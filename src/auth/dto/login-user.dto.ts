import { IsEmail, IsString, Matches, MaxLength, MinLength } from "class-validator";

import { ApiProperty } from "@nestjs/swagger";

export class LoginUserDto {

    @ApiProperty({
        example: 'correo@email.com',
        description: 'Correo electrónico del usuario',
    })
    @IsString()
    @IsEmail()
    email!: string;


    @ApiProperty({
        example: 'Password123',
        description: 'Contraseña del usuario'
    })
    @IsString()
    @MinLength(6)
    @MaxLength(50)
    @Matches(
        /(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
        message: 'The password must have a Uppercase, lowercase letter and a number'
    })
    password!: string;
}