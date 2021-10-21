import { Policy } from '@app/interfaces';
import { Args, Query, ResolveReference, Resolver } from '@nestjs/graphql';
import { PoliciesService } from './policies.service';

@Resolver('Policy')
export class PoliciesResolver {
  constructor(private readonly policiesService: PoliciesService) {}

  @Query('policy')
  findOne(@Args('id') id: string): Promise<IPolicy> {
    return this.policiesService.findOne(id);
  }

  @ResolveReference()
  resolveReference(reference: {
    __typename: string;
    id: string;
    name: string;
  }): Promise<Policy> {
    console.info(`::: ${reference.__typename} reference :::`);

    if (reference.id) {
      return this.policiesService.findOne(reference.id);
    }

    if (reference.name) {
      return this.policiesService.findByName(reference.name);
    }
  }
}
