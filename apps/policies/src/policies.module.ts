import { Module } from '@nestjs/common';
import { PoliciesResolver } from './policies.resolver';
import { PoliciesService } from './policies.service';
import { GraphQLFederationModule } from '@nestjs/graphql';

@Module({
  imports: [
    GraphQLFederationModule.forRoot({
      typePaths: ['apps/policies/**/*.graphql'],
    }),
  ],
  providers: [PoliciesService, PoliciesResolver],
})
export class PoliciesModule {}
