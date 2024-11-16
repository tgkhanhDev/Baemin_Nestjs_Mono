import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { RegisterDto, UpdateUserDto } from 'src/auth-api/dto/request/authen.dto';
import { PrismaPostgresService } from 'src/prisma/prisma.service';
import {user_role} from '.prismas/client-postgres';

@Injectable()
export class UserApiService {
    constructor(
        private postgresDAO: PrismaPostgresService,
    ) {}

    async findOneByEmail(mail: string) {
        const user = await this.postgresDAO.users.findUnique({
            where: {
                email: mail
            }
        });

        if (user && !user.is_active) {
            throw new HttpException("User is not active", HttpStatus.BAD_REQUEST);
        }
        
        return user;
    }

    async findByUserId(user_id: string) {
        const user = await this.postgresDAO.users.findUnique({
            where: {
                user_id
            }
        });

        if (!user) {
            throw new HttpException("User not found", HttpStatus.NOT_FOUND);
        }

        if (!user.is_active) {
            throw new HttpException("User is not active", HttpStatus.BAD_REQUEST);
        }

        return user;
    }

    async registerUser(info: RegisterDto) {
        const { email, phone_number, first_name, last_name, password } = info;
        const user = await this.postgresDAO.users.create({
            data: {
                email,
                phone_number,
                first_name,
                last_name,
                password,
                role: user_role.BUYER
            }
        });
        return user;
    }

    async updateUser(info: UpdateUserDto){
        const {user_id, phone_number, first_name, last_name } = info;
        const user = await this.postgresDAO.users.update({
            where: {
                user_id
            },
            data: {
                phone_number,
                first_name,
                last_name,
                // password
            }
        });
        return user;
    }
}
