import { apiInstance } from "../constant/apiInstance";
import { LoginRequest, LoginResponse, RegisterRequest, UserInfo } from "../types/auth";
import { Food } from "../types/food";
import { utilsResponse } from "../types/utils";

const api = apiInstance("http://localhost:8080/auth-api");

export const manageAuthentication = {
    login: (req: LoginRequest) =>
        api.post<LoginResponse>(`/login`, req),
    register: (req: RegisterRequest) =>
        api.post<LoginResponse>(`/register`, req),
    getUserInfo: (userId: string) => api.get<UserInfo>(`/profile/${userId}`), 
};
