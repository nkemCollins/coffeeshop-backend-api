import { Module, MiddlewareConsumer } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MyUsersController } from './myuser.contoller';
import { MyUsersService } from './myuser.service';
import { MyUser } from './myuser.entity';

@Module({
  imports: [TypeOrmModule.forFeature([MyUser])],
  controllers: [MyUsersController],
  providers: [MyUsersService],
})
export class MyUsersModule {
}