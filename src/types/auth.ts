export interface User {
  id: string;
  email: string;
  username: string;
  fullname?: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials extends LoginCredentials {
  username: string;
  fullname: string;
}

export interface AuthResponse {
  status: any;
  user: User;
  token: string;
}

export interface AuthError {
  message: string;
  errors?: Record<string, string[]>;
}
