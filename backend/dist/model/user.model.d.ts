export declare class UserResponse {
    id?: number;
    name: string;
    email: string;
    password?: string;
}
export declare class LoginUserResponse {
    token?: string;
    user?: UserResponse;
}
export declare class LoginUserRequest {
    email: string;
    password: string;
}
export declare class RegisterUserRequest {
    name: string;
    email: string;
    password: string;
}
export declare class RegisterUserResponse {
    token?: string;
    user?: UserResponse;
}
export declare class ChangePasswordRequest {
    oldPassword: string;
    password: string;
}
export declare class ChangeProfileRequest {
    name: string;
}
