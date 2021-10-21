import { IJwtPayload, ISignIn, User } from '@app/interfaces';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  async signIn(email: string, password: string): Promise<ISignIn> {
    const user: any = {
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
    };

    const access_token: string = this.generateAccessToken(user, 'auth');

    return {
      access_token,
      user: {
        name: user.name,
        email: user.email,
        role: {
          name: user.role.name,
        },
      },
    };
  }

  generateAccessToken(user: User): string {
    const expiresIn = '24h';

    const payload: IJwtPayload = {
      user_id: user.id,
    };

    return this.jwtService.sign(payload, { expiresIn });
  }
}
