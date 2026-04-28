import { Controller, Get, Post, Body } from '@nestjs/common';

import { GetUser } from './decorators';

import { CreateUserDto, LoginUserDto } from './dto';
import { AuthService } from './auth.service';
import { User } from './entities/user.entity';

// 👇 Swagger imports
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @ApiOperation({ summary: 'Registrar un nuevo usuario' })
  @ApiResponse({ status: 201, description: 'Usuario creado correctamente' })
  @ApiResponse({ status: 400, description: 'Error en la petición' })
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.authService.create(createUserDto);
  }

  @Post('login')
  @ApiOperation({ summary: 'Iniciar sesión de usuario' })
  @ApiResponse({ status: 200, description: 'Login exitoso, retorna JWT' })
  @ApiResponse({ status: 401, description: 'Credenciales inválidas' })
  loginUser(@Body() loginUserDto: LoginUserDto) {
    return this.authService.login(loginUserDto);
  }

  @Get('check-status')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Verificar estado de autenticación' })
  @ApiResponse({ status: 200, description: 'Usuario autenticado' })
  @ApiResponse({ status: 401, description: 'No autorizado' })
  checkAuthStatus(
    @GetUser() user: User,
  ) {

    return this.authService.checkAuthStatus( user )
  }

}