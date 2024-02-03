import { MiddlewareConsumer, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { MenuModule } from './menu/menu.module';
import { User } from './users/user.entity';
import { MyUser } from './myuser/myuser.entity';
//import { MyUsersController } from './myuser/myuser.contoller';
import { MyUsersModule } from './myuser/myuser.module';
import { Menu } from './menu/menu.entity';
import { Product } from './product/product.entity';
import { ProductModule } from './product/product.module';
const cookieSession = require('cookie-session');

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mongodb',
      url: 'mongodb://127.0.0.1:27017/mycoffeeshop',
      entities: [User, MyUser, Menu, Product],
      synchronize: true,
      logging: true,
    }),
    UsersModule,
    MyUsersModule,
    MenuModule,
    ProductModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  // configure(consumer: MiddlewareConsumer) {
  //   consumer
  //     .apply(
  //       cookieSession({
  //         keys: ['asdfasdf'],
  //       }),
  //     )
  //     .forRoutes('*');
  // }
}
