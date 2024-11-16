import { IsEmail, IsNumber, IsString } from "class-validator";

export class LoginDto {
    @IsEmail()
    email: string;
    password: string;
}

export class RegisterDto {
    @IsEmail()
    email: string;
    @IsString()
    phone_number: string;
    @IsString()
    first_name: string;
    @IsString()
    last_name: string;
    @IsString()
    password: string;
}