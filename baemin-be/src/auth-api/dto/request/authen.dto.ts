import { IsEmail } from "class-validator";

export class LoginDto {
    @IsEmail()
    email: string;
    password: string;
}

export class RegisterDto {
    @IsEmail()
    email: string;

    phone_number: string;

    first_name: string;

    last_name: string;

    password: string;
}