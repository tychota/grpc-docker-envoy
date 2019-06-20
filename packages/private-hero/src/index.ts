import { join } from 'path';
import grpc from 'grpc';

import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { HeroModule } from './hero.module';
import { readFileSync } from 'fs';

const credentials = grpc.ServerCredentials.createSsl(null, [
  {
    private_key: readFileSync('/srv/certs/server.key'),
    cert_chain: readFileSync('/srv/certs/server.crt'),
  },
]);

async function bootstrap() {
  const app = await NestFactory.createMicroservice(HeroModule, {
    transport: Transport.GRPC,
    options: {
      url: '0.0.0.0:50051',
      package: 'hero',
      protoPath: join(__dirname, '..', 'proto/hero.proto'),
      credentials,
    },
  });
  await app.listenAsync();
}
bootstrap();
