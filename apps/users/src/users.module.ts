import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersResolver } from './users.resolver';
import { GraphQLFederationModule } from '@nestjs/graphql';
import { GraphQLSchema } from 'graphql';
import { authDirectiveTransformer } from './auth-directive.transformer';

@Module({
  imports: [
    GraphQLFederationModule.forRoot({
      typePaths: ['apps/users/**/*.graphql'],
      // Not execute
      // schemaTransforms: [authDirectiveTransformer],

      // Extended Types fields return null
      transformSchema: (schema: GraphQLSchema): GraphQLSchema =>
        authDirectiveTransformer(schema),
    }),
  ],
  providers: [UsersService, UsersResolver],
})
export class UsersModule {}
