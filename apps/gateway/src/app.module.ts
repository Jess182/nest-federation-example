import { Module } from '@nestjs/common';
import { GraphQLGatewayModule } from '@nestjs/graphql';

@Module({
  imports: [
    GraphQLGatewayModule.forRootAsync({
      useFactory: () => ({
        server: {
          cors: true,
        },
        gateway: {
          serviceList: [
            { name: 'policies', url: 'http://localhost:3003/graphql' },
          ],
        },
      }),
    }),
  ],
})
export class AppModule {}
