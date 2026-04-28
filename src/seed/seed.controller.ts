import { Controller, Get } from '@nestjs/common';
import { SeedService } from './seed.service';
import { Auth } from 'src/auth/decorators';
import { ValidRoles } from 'src/auth/interfaces';

import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('Seed')
@Controller('seed')
export class SeedController {
  constructor(private readonly seedService: SeedService) {}

  @Get()
  @ApiOperation({ summary: 'Ejecutar seed de la base de datos' })
  @ApiResponse({ status: 200, description: 'Seed ejecutado correctamente' })
  // @Auth( ValidRoles.admin )
  excute() {
    return this.seedService.runSeed();
  }

}