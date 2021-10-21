import { Policy } from '@app/interfaces';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PoliciesService {
  private readonly policies: Policy[] = [
    {
      id: '1',
      name: 'admin',
      statement: {
        all: {
          manage: true,
        },
      },
    },
    {
      id: '2',
      name: 'supervisor',
      statement: {
        user: {
          create: true,
          read: true,
          update: true,
          delete: false,
        },
        configuration: {
          manage: false,
        },
      },
    },
  ];

  async findOne(id: string): Promise<Policy> {
    return await this.policies.find((policy: Policy) => policy.id === id);
  }

  async findByName(name: string): Promise<Policy> {
    return await this.policies.find((policy: Policy) => policy.name === name);
  }
}
