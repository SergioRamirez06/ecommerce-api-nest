import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe, Query } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { Auth, GetUser } from 'src/auth/decorators';
import { ValidRoles } from 'src/auth/interfaces';
import { User } from 'src/auth/entities/user.entity';

import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiParam, ApiQuery } from '@nestjs/swagger';

@ApiTags('Products')
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Crear un producto' })
  @ApiResponse({ status: 201, description: 'Producto creado correctamente' })
  @ApiResponse({ status: 401, description: 'No autorizado' })
  @Auth()
  create(
    @Body() createProductDto: CreateProductDto,
    @GetUser() user: User
  ) {
    return this.productsService.create(createProductDto, user);
  }

  @Get()
  @ApiOperation({ summary: 'Obtener todos los productos con paginación' })
  @ApiResponse({ status: 200, description: 'Lista de productos' })
  @ApiQuery({ name: 'limit', required: false, example: 10 })
  @ApiQuery({ name: 'offset', required: false, example: 0 })
  findAll(@Query() paginationDto: PaginationDto ) {
    return this.productsService.findAll(paginationDto);
  }

  @Get(':term')
  @ApiOperation({ summary: 'Obtener un producto por id o término' })
  @ApiResponse({ status: 200, description: 'Producto encontrado' })
  @ApiResponse({ status: 404, description: 'Producto no encontrado' })
  @ApiParam({ name: 'term', description: 'UUID o slug del producto', example: 'abc-123' })
  findOne(@Param('term') term: string) {
    return this.productsService.findOnePlain(term);
  }

  @Patch(':id')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Actualizar un producto (solo admin)' })
  @ApiResponse({ status: 200, description: 'Producto actualizado' })
  @ApiResponse({ status: 401, description: 'No autorizado' })
  @ApiResponse({ status: 403, description: 'Sin permisos' })
  @ApiParam({ name: 'id', description: 'UUID del producto', example: 'uuid' })
  @Auth( ValidRoles.admin )
  update(
    @Param('id', ParseUUIDPipe) id: string, 
    @Body() updateProductDto: UpdateProductDto,
    @GetUser() user: User
  ) {
    return this.productsService.update( id, updateProductDto, user);
  }

  @Delete(':id')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Eliminar un producto (solo admin)' })
  @ApiResponse({ status: 200, description: 'Producto eliminado' })
  @ApiResponse({ status: 401, description: 'No autorizado' })
  @ApiResponse({ status: 403, description: 'Sin permisos' })
  @ApiParam({ name: 'id', description: 'UUID del producto', example: 'uuid' })
  @Auth( ValidRoles.admin )
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.productsService.remove(id);
  }
}