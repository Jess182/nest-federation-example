export interface IJwtPayload {
  user_id: string;
}

export interface ISignIn {
  access_token: string;
  user: {
    name: string;
    email: string;
    role: string | { name: string };
  };
}
