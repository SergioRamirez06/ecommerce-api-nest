import { IsEmail, IsString, Matches, MaxLength, MinLength } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateUserDto {

    @ApiProperty({
        example: 'correo@email.com',
        description: 'Correo electrónico del usuario'
    })
    @IsString()
    @IsEmail()
    email!: string;


    @ApiProperty({
        example: 'Password123',
        description: 'Contraseña con mayúscula, minúscula y número (6-50 caracteres)'
    })
    @IsString()
    @MinLength(6)
    @MaxLength(50)
    @Matches(
        /(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
        message: 'The password must have a Uppercase, lowercase letter and a number'
    })
    password!: string;

    @ApiProperty({
        example: 'Sergio Ramírez',
        description: 'Nombre completo del usuario'
    })
    @IsString()
    @MinLength(3)
    @MaxLength(70)
    fullName!: string;
}