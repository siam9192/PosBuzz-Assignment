export interface RegisterPayload {
  name: string;
  email: string;
  password: string;
}

export type LoginPayload = Omit<RegisterPayload, "name">;
