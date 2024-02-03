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
  Session,
  UseGuards,
} from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dtos/update-user.dto';
import { Serialize } from '../interceptors/serialize.interceptor';
import { UserDto } from './dtos/user.dto';
import { AuthService } from './auth.service';
import { SigninUserDto } from './dtos/signin-user.dto';
import { CurrentUser } from './decorators/current-user.decorator';
import { User } from './user.entity';
import { AuthGuard } from '../guards/auth.guards';
import { SetAdminDto } from './dtos/set-admin.dto';
import { AdminGuard } from '../guards/admin.guard';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('user')
@Controller('auth')
@Serialize(UserDto)
export class UsersController {
  constructor(
    private usersService: UsersService,
    private authService: AuthService,
  ) {}

  // @UseGuards(AuthGuard)
  // @Get('/colors/:color')
  // setColor(@Param('color') color: string, @Session() session: any) {
  //   session.color = color;
  // }

  // @UseGuards(AuthGuard)
  // @Get('/colors')
  // getColor(@Session() session: any) {
  //   return session.color;
  // }

  //   @Get('/whoami')
  //   whoAmI(@Session() session: any) {
  //     return this.usersService.findOne(session.userId);
  //   }

  @Get('/whoami')
  @UseGuards(AuthGuard)
  whoAmI(@CurrentUser() user: User) {
    return user;
  }

  @Post('/signout')
  @ApiOperation({ summary: 'signout a user' })
  @ApiResponse({
    status: 200,
    description: 'user succesfully signed out',
  })
  @ApiResponse({
    status: 404,
    description: 'Not Found',
  })
  signOut(@Session() session: any) {
    session.userId = null;
  }

  //create new user
  @Post('/signup')
  @ApiOperation({ summary: 'create a new user' })
  @ApiResponse({
    status: 201,
    description: 'user successfully signed up',
    type: CreateUserDto,
  })
  @ApiResponse({
    status: 422,
    description: 'Unprocessable entity',
  })
  @ApiResponse({
    status: 409,
    description: 'Conflict',
  })
  async createUser(@Body() body: CreateUserDto, @Session() session: any) {
    const user = await this.authService.signup(
      body.firstname,
      body.lastname,
      body.email,
      body.password,
    );

    session.userId = user._id;

    return user;
  }

  @Post('signin')
  @ApiOperation({ summary: 'signin existing user' })
  @ApiResponse({
    status: 200,
    description: 'user successfully signed in',
    type: SigninUserDto,
  })
  @ApiResponse({
    status: 422,
    description: 'Unprocessable entity',
  })
  @ApiResponse({
    status: 404,
    description: 'Not Found',
  })
  async sigin(@Body() body: SigninUserDto, @Session() session: any) {
    const user = await this.authService.signin(body.email, body.password);
    session.userId = user._id;

    return user;
  }

  //find user by id
  @Get('/:id')
  async findUser(@Param('id') id: string) {
    const user = await this.usersService.findOne(id);
    if (!user) {
      throw new NotFoundException('user not found');
    }
    return user;
  }

  //find users with particular email
  @Get()
  findAllUsers(@Query('email') email: string) {
    return this.usersService.find(email);
  }

  //remove user
  @Delete('/:id')
  removeUser(@Param('id') id: string) {
    return this.usersService.remove(id);
  }

  //update user
  @Patch('/:id')
  updateUser(@Param() id: string, @Body() body: UpdateUserDto) {
    return this.usersService.update(id, body);
  }

  // @Patch(':/id')
  // updateAdmin(@Param('id') id: string, @Body() body: SetAdminDto) {
  //   return this.usersService.update(id, body);
  // }

  // @Patch(':/id')
  // assignAdmin(@Param('id') id: string, @Body() body: SetAdminDto) {
  //   console.log(body.admin);
  //   return this.usersService.setAdmin(id, body.admin);

  // @UseGuards(AuthGuard)
  // @Post('/additem')
  // async createNewItem(@Body() body: CreateMenuDto) {
  //   const menuitem = await this.menuService.create(body.category, body.item);

  //   return menuitem;
  // }
}

@Controller('test')
@Serialize(UserDto)
export class AdminController {
  constructor(private usersService: UsersService) {}

  @UseGuards(AdminGuard)
  @Patch('/:id')
  assignAdmin(@Param('id') id: string, @Body() body: SetAdminDto) {
    //console.log(body.admin);
    return this.usersService.setAdmin(id, body.admin);
  }
}
