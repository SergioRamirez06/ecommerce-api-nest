import { IsArray, IsIn, IsInt, IsNumber, IsOptional, IsPositive, IsString, MinLength } from 'class-validator'

import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'

export class CreateProductDto {

    @ApiProperty({
        example: 'Camiseta deportiva',
        description: 'Título del producto',
        uniqueItems: true
    })
    @IsString()
    @MinLength(2)
    title!: string;

    @ApiPropertyOptional({
        example: 50000,
        description: 'Precio del producto'
    })
    @IsNumber()
    @IsPositive()
    @IsOptional()
    price?: number;

    @ApiPropertyOptional({
        example: 'Camiseta de alta calidad para entrenamiento',
        description: 'Descripción del producto'
    })
    @IsString()
    @IsOptional()
    description?: string;

    @ApiPropertyOptional({
        example: 'camiseta_deportiva',
        description: 'Slug único del producto'
    })
    @IsString()
    @IsOptional()
    slug?: string;

    @ApiPropertyOptional({
        example: 10,
        description: 'Cantidad disponible en stock'
    })
    @IsInt()
    @IsPositive()
    @IsOptional()
    stock?: number;

    @ApiProperty({
        example: ['S', 'M', 'L'],
        description: 'Tallas disponibles'
    })
    @IsString({ each: true })
    @IsArray()
    sizes!: string[];

    @ApiProperty({
        example: 'unisex',
        description: 'Género del producto',
        enum: ['male', 'female', 'kid', 'unisex']
    })
    @IsIn(['male', 'female', 'kid', 'unisex'])
    gender!: string;

    @ApiPropertyOptional({
        example: ['ropa', 'deporte'],
        description: 'Etiquetas del producto'
    })
    @IsOptional()
    @IsString({ each: true })
    @IsArray()
    tags?: string[];

    @ApiPropertyOptional({
        example: ['image1.jpg', 'image2.jpg'],
        description: 'Imágenes del producto'
    })
    @IsOptional()
    @IsString({ each: true })
    @IsArray()
    images?: string[];
}