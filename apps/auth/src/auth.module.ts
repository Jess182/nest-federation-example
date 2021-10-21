import { Module } from '@nestjs/common';
import { AuthResolver } from './auth.resolver';
import { AuthService } from './auth.service';
import { GraphQLFederationModule } from '@nestjs/graphql';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    GraphQLFederationModule.forRoot({
      typePaths: ['apps/auth/**/*.graphql'],
    }),
    JwtModule.register({
      secret: 's3cr3+',
    }),
  ],
  providers: [AuthService, AuthResolver],
})
export class AuthModule {}
