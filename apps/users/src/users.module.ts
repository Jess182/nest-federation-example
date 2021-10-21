import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersResolver } from './users.resolver';
import { GraphQLFederationModule } from '@nestjs/graphql';

@Module({
  imports: [
    GraphQLFederationModule.forRoot({
      typePaths: ['apps/users/**/*.graphql'],
    }),
  ],
  providers: [UsersService, UsersResolver],
})
export class UsersModule {}
