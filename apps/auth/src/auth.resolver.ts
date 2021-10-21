import {
  Args,
  Mutation,
  Parent,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { Auth, ISignIn } from '@app/interfaces';
import { AuthService } from './auth.service';

@Resolver('Auth')
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation()
  signIn(
    @Args('email') email: string,
    @Args('password') password: string,
  ): Promise<ISignIn> {
    return this.authService.signIn(email, password);
  }

  @ResolveField('user')
  getUser(@Parent() auth: Auth): { __typename: string; email: string } {
    return { __typename: 'User', email: auth.user.email };
  }

  @ResolveField('role')
  getPolicy(@Parent() auth: Auth): { __typename: string; name: string } {
    return { __typename: 'Policy', name: auth.user.role.name };
  }
}
