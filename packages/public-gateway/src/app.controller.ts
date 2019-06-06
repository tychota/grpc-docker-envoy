import { join } from 'path';

import { Controller, Get, Param } from '@nestjs/common';
import { Client, ClientGrpc, Transport } from '@nestjs/microservices';

import { HeroService } from '../../private-hero/src/hero.controller';

@Controller()
export class AppController {
  @Client({
    transport: Transport.GRPC,
    options: {
      url: 'ms-proxy:50051',
      package: 'hero',
      protoPath: join(__dirname, '..', 'proto/hero.proto'),
    },
  })
  private readonly client!: ClientGrpc;

  private heroService!: HeroService;

  onModuleInit() {
    this.heroService = this.client.getService<HeroService>('HeroService');
  }

  @Get('/hero/:id')
  getHeroes(@Param() params: { id: number }) {
    return this.heroService.findOne({ id: params.id }).toPromise();
  }
}
