import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaPostgresService } from 'src/prisma/prisma.service';
import { UserApiService } from 'src/user-api/user-api.service';
import { RegisterDto, UpdateUserDto } from './dto/request/authen.dto';

@Injectable()
export class AuthApiService {
    constructor(
        private postgresDAO: PrismaPostgresService,
        private userApiService: UserApiService
    ) {}

    async signIn(username: string, pass: string): Promise<any> {
        const user = await this.userApiService.findOneByEmail(username);
        if (user?.password !== pass) {
            throw new UnauthorizedException();
        }
        const { password, ...result } = user;
        // TODO: Generate a JWT and return it here
        // instead of the user object
        return {
            user_id: user.user_id,
            last_name: user.last_name,
            role: user.role
        };
    }

    async getUserInfo(user_id: string) {
        const user = await this.userApiService.findByUserId(user_id);
        return {
            user_id: user.user_id,
            email: user.email,
            phone_number: user.phone_number,
            first_name: user.first_name,
            last_name: user.last_name,
            role: user.role
        };
    }

    async updateUserInfo(info: UpdateUserDto) {
        return this.userApiService.updateUser(info);
    }

    async registerUser( info: RegisterDto ) {
        const user = await this.userApiService.findOneByEmail(info.email);
        if (user) {
            throw new HttpException("Email already exists", HttpStatus.BAD_REQUEST);
        }
        return this.userApiService.registerUser(info);
    }
}
