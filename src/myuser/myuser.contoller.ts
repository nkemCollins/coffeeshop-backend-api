import {
  Body,
  Controller,
  Post,
  Get,
  Patch,
  Param,
  Query,
  Delete,
  NotFoundException,
  ClassSerializerInterceptor,
  Session,
  UseGuards,
} from '@nestjs/common';
// import { Serialize } from '../interceptors/serialize.interceptor';
import { MyUsersService } from './myuser.service';

@Controller()
export class MyUsersController {
  constructor(private myusersService: MyUsersService) {}

  //create new user
  @Post('/signmeup')
  async createUser(@Body() body: any) {
    const user = await this.myusersService.create(
      body.firstname,
      body.lastname,
      body.nickname,
    );

    // session.userId = user._id;

    return user;
  }
}
