export interface IUserRegister {
  id?: number;
  username: string;
  email: string;
  password: string;
  securitylevel: number;
}

export interface IResponse<T = any> {
  status?: number;
  success?: boolean;
  message?: string;
  data?: T
}

export interface IUserLogin {
  username: string;
  password: string;
}

export interface Authorities {
  authority: string;
}

export interface AuthenticatedUser {
  username: string;
  authorities: Authorities[];
}

export interface AuthenticationResponse {
  access: string;
  refresh: string;
}

export interface IDocument {
  id?:  number;
  title:  string;
  content:  string;
  securitylevel:  number;
}
