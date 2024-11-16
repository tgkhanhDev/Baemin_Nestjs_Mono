import { IsBoolean, IsEmail, IsEnum, IsString, Length } from "class-validator";
import { user_role } from '.prismas/client-postgres';

export class Users {
    @IsString()
    user_id: string;

    @IsEmail()
    email: string;

    @IsString()
    @Length(10, 15)
    phone_number: string;

    @IsString()
    @Length(1, 50)
    first_name: string;

    @IsString()
    @Length(1, 50)
    last_name: string;

    @IsString()
    @Length(8, 255) // Ensures a reasonably secure password length
    password: string;

    @IsEnum(user_role)
    role: user_role;

    @IsBoolean()
    is_active: boolean;
}