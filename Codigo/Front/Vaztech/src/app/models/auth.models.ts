export enum PerfisAuth {
  ADMIN = 1,
  FUNCIONARIO = 2,
}

export type AuthResponse = {
  id: PerfisAuth;
  token: string;
};
