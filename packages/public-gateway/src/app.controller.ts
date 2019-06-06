import { Controller, Get, Param } from '@nestjs/common';
import { Client, ClientGrpc } from '@nestjs/microservices';

import { HeroService } from '../../private-hero/src/hero.controller';
import { grpcClientOptions } from '../../private-hero/src/grpc.client';

@Controller()
export class AppController {
  @Client(grpcClientOptions)
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
