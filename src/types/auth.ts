export type LoginCredentials = {
  username: string;
  password: string;
};

export type AuthToken = string;

export type AuthSession = {
  token: AuthToken;
  userId: number;
};
