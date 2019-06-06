import { GrpcOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';

export const grpcClientOptions = {
  transport: Transport.GRPC,
  options: {
    url: 'ms-proxy:50051',
    package: 'hero',
    protoPath: join(__dirname, '..', 'proto/hero.proto'),
  },
} as GrpcOptions;
