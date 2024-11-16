import { Module } from '@nestjs/common';
import { AuthApiService } from './auth-api.service';
import { AuthApiController } from './auth-api.controller';
import { UserApiService } from 'src/user-api/user-api.service';
import { UserApiModule } from 'src/user-api/user-api.module';

@Module({
  imports: [UserApiModule],
  controllers: [AuthApiController],
  providers: [AuthApiService, UserApiService],
})
export class AuthApiModule {}
