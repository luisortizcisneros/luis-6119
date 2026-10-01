export type UserSession = {
  email: string;
  password: string;
  name: string;
  lastName: string;
}

export type CreateUser = {
  name: string;
  lastName: string;
  email: string;
  password: string;
  passwordConfirmation: string;
}

export type UserData = {
  name: string;
  lastName: string;
  email: string;
  password: string;
  balance: number;
}