import * as path from 'path';

import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { HeroModule } from './hero.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice(HeroModule, {
    transport: Transport.GRPC,
    options: {
      url: '0.0.0.0:50051',
      package: 'hero',
      protoPath: path.join(__dirname, '..', 'proto/hero.proto'),
    },
  });
  await app.listenAsync();
}
bootstrap();
