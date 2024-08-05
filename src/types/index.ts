export interface IUserRegisterData {
  username: string,
  first_name: string,
  last_name: string,
  email: string,
  password: string,
  password2: string,
}

export interface IUserRegisterResponse {
  username: string,
  first_name: string,
  last_name: string,
  email: string,
  token: string,
}

export interface IUserLoginData {
  username: string,
  email: string,
  password: string,
}

export interface IUserLoginResponse {
  key: string,
  user: {
    id: number,
    username: string,
    email: string,
    first_name: string,
    last_name: string,
    is_superuser: boolean,
  }
}
