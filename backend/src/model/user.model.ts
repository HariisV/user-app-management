export class UserResponse {
  id?: number;
  name: string;
  email: string;
  password?: string;
}

export class LoginUserResponse {
  token?: string;
  user?: UserResponse;
}
export class LoginUserRequest {
  email: string;
  password: string;
}

export class RegisterUserRequest {
  name: string;
  email: string;
  password: string;
}

export class RegisterUserResponse {
  token?: string;
  user?: UserResponse;
}

export class ChangePasswordRequest {
  oldPassword: string;
  password: string;
}

export class ChangeProfileRequest {
  name: string;
}
