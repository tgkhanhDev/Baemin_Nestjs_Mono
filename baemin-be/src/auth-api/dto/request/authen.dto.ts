import { Optional } from "@nestjs/common";
import { IsEmail, IsNumber, IsString, IsUUID } from "class-validator";

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

export class UpdateUserDto {
    @IsUUID()
    user_id: string;
    // @IsEmail()
    // email: string;
    @IsString()
    phone_number: string;
    @IsString()
    first_name: string;
    @IsString()
    last_name: string;
    // @IsString()
    // @Optional()
    // password: string;
}