import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { HeroById } from './interfaces/hero-by-id.interface';
import { Hero } from './interfaces/hero.interface';

export interface HeroService {
  findOne(data: { id: number }): Observable<any>;
}

@Controller()
export class HeroController {
  @GrpcMethod('HeroService')
  findOne(data: HeroById): Hero | undefined {
    const items: Hero[] = [{ id: 1, name: 'John' }, { id: 2, name: 'Doe' }];
    return items.find(({ id }) => id === data.id);
  }
}
