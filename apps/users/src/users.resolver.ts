import {
  Args,
  Parent,
  Query,
  ResolveField,
  ResolveReference,
  Resolver,
} from '@nestjs/graphql';
import { User } from '@app/interfaces';
import { UsersService } from './users.service';

@Resolver('User')
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Query('user')
  findOne(@Args('id') id: string): Promise<User> {
    return this.usersService.findOne(id);
  }

  @ResolveField('role')
  async getPolicy(
    @Parent() user: User,
  ): Promise<{ __typename: string; name: string }> {
    console.info(`::: resolver field 'role' :::`);

    if (user.email && !user.role?.name)
      user.role = (await this.usersService.findByEmail(user.email)).role;

    return { __typename: 'Policy', name: user.role.name };
  }

  @ResolveReference()
  resolveReference(reference: {
    __typename: string;
    id: string;
    email: string;
  }): Promise<User> {
    console.info(`::: ${reference.__typename} reference :::`);

    if (reference.id) {
      return this.usersService.findOne(reference.id);
    }

    if (reference.email) {
      return this.usersService.findByEmail(reference.email);
    }
  }
}
