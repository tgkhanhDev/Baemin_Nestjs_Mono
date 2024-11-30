export interface LoginRequest {
  email: string;
  password: string;
}

enum user_role {
  BUYER = "BUYER",
  SELLER = "SELLER",
  ADMIN = "ADMIN",
}

export interface LoginResponse {
  user_id: string;
  last_name: string;
  role: user_role;
}

export interface RegisterRequest {
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
  password: string;
  confirm_password?: string; //optional
  // role: user_role
}

export interface UserInfo {
  user_id: string;
  email: string;
  phone_number: string;
  first_name: string;
  last_name: string;
  role: string;
}

export interface UpdateInfo {
  user_id: string;
  phone_number: string;
  first_name: string;
  last_name: string;
}
