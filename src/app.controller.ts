import { Controller, Get } from '@nestjs/common';
import { ApiExcludeController, ApiExcludeEndpoint } from '@nestjs/swagger';

@Controller()
export class AppController {
  constructor() { }

  @ApiExcludeEndpoint()
  @Get()
  getHello() {
    console.log('hello');
  }
}
