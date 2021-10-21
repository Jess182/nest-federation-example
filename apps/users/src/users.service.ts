import { User } from '@app/interfaces';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
  private readonly users: any[] = [
    {
      id: '1',
      name: 'john',
      email: 'john@mail.com',
      password: 'changeme',
      role: {
        name: 'admin',
        statement: {
          all: {
            manage: true,
          },
        },
      },
    },
    {
      id: '2',
      name: 'maria',
      email: 'maria@mail.com',
      password: 'guess',
      role: {
        name: 'guess',
        statement: {
          all: {
            manage: false,
          },
        },
      },
    },
  ];

  async findOne(id: string): Promise<User> {
    return await this.users.find((user) => user.id === id);
  }

  async findByEmail(email: string): Promise<User> {
    return await this.users.find((user) => user.email === email);
  }
}
