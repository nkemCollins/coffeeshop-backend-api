import { Controller, Post, Get, UseGuards, Body, Param } from '@nestjs/common';
import { MenuService } from './menu.service';
import { CreateMenuDto } from './dtos/create-menu.dto';
import { AdminGuard } from '../guards/admin.guard';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('inventory')
@Controller('inventory')
export class InventoryController {
  constructor(private menuService: MenuService) {}

  @UseGuards(AdminGuard)
  @Post('/additem')
  @ApiOperation({ summary: 'add new item to inventory' })
  @ApiResponse({
    status: 201,
    description: 'item successfully created',
    type: CreateMenuDto,
  })
  @ApiResponse({
    status: 422,
    description: 'Unprocessable entity',
  })
  @ApiResponse({
    status: 403,
    description: 'Forbidden',
  })
  async createNewItem(@Body() body: CreateMenuDto) {
    const menuitem = await this.menuService.create(body.category, body.item);
    //let user;

    //session.userId = user._id;

    return menuitem;
  }

  //   @UseGuards(AuthGuard)
  //   @Get('/colors/:color')
  //   setColor(@Param('color') color: string, @Session() session: any) {
  //     session.color = color;
  //   }

  //   @Get('/colors')
  //   getColor(@Session() session: any) {
  //     return session.color;
  //   }
}

@ApiTags('menu')
@Controller('menu')
export class MenuController {
  constructor(private menuService: MenuService) {}

  @Get('/showmenu')
  @ApiOperation({ summary: 'display all menu items' })
  @ApiResponse({
    status: 200,
    description: 'menu items succesfully displayed',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request',
  })
  async displayMenu() {
    return this.menuService.displayMenuItems();
  }

  @Get('/moreItems/:menuName')
  @ApiOperation({ summary: 'display menu subitems' })
  @ApiResponse({
    status: 200,
    description: 'menu subtiems successfully displayed',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request',
  })
  async moreitems(@Param('menuName') menuName: string) {
    return this.menuService.listSpecificMenuItems(menuName);
  }
}
