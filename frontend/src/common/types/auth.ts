export interface ISignin {
  email: string;
  password: string;
}

export interface ISignup extends ISignin {
  name: string;
  confirmPassword: string;
}
