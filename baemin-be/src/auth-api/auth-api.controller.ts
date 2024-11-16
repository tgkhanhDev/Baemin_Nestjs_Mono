import { Body, Controller, Get, HttpCode, HttpStatus, Param, Patch, Post, ValidationPipe } from '@nestjs/common';
import { AuthApiService } from './auth-api.service';
import { ApiBody, ApiOperation, ApiParam } from '@nestjs/swagger';
import { LoginDto, RegisterDto, UpdateUserDto } from './dto/request/authen.dto';

@Controller('auth-api')
export class AuthApiController {
  constructor(private readonly authApiService: AuthApiService) {}

  @HttpCode(HttpStatus.OK)
  @Post('/login')
  @ApiOperation({
    summary: 'Get login by email',
  })
  @ApiBody({
    description: 'Create transaction request body',
    type: LoginDto,
    examples: {
      example1: {
        summary: 'Example',
        value: {
          email: 'abc@gmail.com',
          password: "******"
        }
      },
    },
  })
  SignIn(@Body() signInDto: LoginDto) {
    const {email, password} = signInDto;
    return this.authApiService.signIn(email, password);
  }


  @Post('/register')
  @ApiOperation({
    summary: 'Get login by email',
  })
  @ApiBody({
    description: 'Create transaction request body',
    type: RegisterDto,
    examples: {
      example1: {
        summary: 'Example',
        value: {
          email: 'abc@gmail.com',
          password: "******",
          phone_number:"0123456789",
          first_name:"John",
          last_name:"Doe",
        }
      },
    },
  })
  RegisterUser(@Body(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true })) registerDto: RegisterDto) {
    const { email, phone_number, first_name, last_name, password } = registerDto;
    return this.authApiService.registerUser(registerDto);
  }
  
  @Get('/profile/:user_id')
  @ApiOperation({
    summary: 'Get profile by userId',
  })
  @ApiParam({
    name: 'user_id',
    description: 'userId',
    required: true
  })
  GetUserProfile(@Param('user_id') user_id: string) {
    return this.authApiService.getUserInfo(user_id);
  }

  @Patch('/update-profile/:user_id')
  @ApiOperation({
    summary: 'Update user profile',
  })
  @ApiBody({
    type: UpdateUserDto,
    examples: {
      example1: {
        summary: 'Example',
        value: {
          user_id: "",
          phone_number:"0123456789",
          first_name:"John",
          last_name:"Doe",
        }
      },
    },
  })
  UpadateUserProfile(@Body() info: UpdateUserDto) {
    return this.authApiService.updateUserInfo(info);
  }
}
