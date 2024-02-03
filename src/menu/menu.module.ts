import { MiddlewareConsumer, Module } from '@nestjs/common';
import { InventoryController, MenuController } from './menu.controller';
import { MenuService } from './menu.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Menu } from './menu.entity';
import { UsersService } from 'src/users/users.service';

@Module({
  imports: [TypeOrmModule.forFeature([Menu])],
  controllers: [InventoryController, MenuController],
  providers: [MenuService],
})
export class MenuModule {}

// @Module({
//   imports: [TypeOrmModule.forFeature([Menu])],
//   controllers: [InventoryController],
//   providers: [MenuService],
// })
// export class MenuModule {
//   configure(consumer: MiddlewareConsumer) {
//     consumer.apply(CurrentUserMiddleware).forRoutes('*');
//   }
// }
