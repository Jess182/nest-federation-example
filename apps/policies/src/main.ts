import { NestFactory } from '@nestjs/core';
import { PoliciesModule } from './policies.module';

async function bootstrap() {
  const app = await NestFactory.create(PoliciesModule);
  await app.listen(3003);
}
bootstrap();
