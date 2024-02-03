import {
  Controller,
  Post,
  Body,
  UseGuards,
  Patch,
  Param,
  Get,
  Query,
  Delete,
} from '@nestjs/common';
import { CurrentUser } from '../users/decorators/current-user.decorator';
import { User } from '../users/user.entity';
import { AuthGuard } from 'src/guards/auth.guards';
import { CreateProductDto } from './dtos/create-product.dto';
import { ProductService } from './product.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('cart')
@UseGuards(AuthGuard)
@Controller('cart')
export class ProductController {
  constructor(private productService: ProductService) {}

  @Post('/addproduct')
  @ApiOperation({ summary: 'create new product' })
  @ApiResponse({
    status: 201,
    description: 'product successfully created',
    type: CreateProductDto,
  })
  @ApiResponse({
    status: 401,
    description: 'Unathorized',
  })
  @ApiResponse({
    status: 422,
    description: 'Unprocessable entity',
  })
  createProduct(@Body() body: CreateProductDto, @CurrentUser() user: User) {
    return this.productService.create(body, user);
  }

  @Get('/checkout/:userId')
  @ApiOperation({ summary: 'fetch all user products' })
  @ApiResponse({
    status: 200,
    description: 'user products successfully fetched',
    isArray: true,
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request',
  })
  @ApiResponse({
    status: 401,
    description: 'Unathorized',
  })
  async findAllProductsByUser(@Param('userId') userId: string) {
    //console.log(userId);
    const prod = await this.productService.findProducts(userId);
    //console.log(userId);
    return prod;
  }

  @Delete('deleteItem/:id')
  @ApiOperation({ summary: 'delete existing product' })
  @ApiResponse({
    status: 201,
    description: 'product successfully deleted',
  })
  @ApiResponse({
    status: 401,
    description: 'Unathorized',
  })
  @ApiResponse({
    status: 422,
    description: 'Unprocessable entity',
  })
  @ApiResponse({
    status: 404,
    description: 'Not Found',
  })
  removeItem(@Param('id') id: string) {
    this.productService.deleteItem(id);

    return 'item deleted';
  }

  @Patch('updateItem/:id')
  @ApiOperation({ summary: 'update existing product' })
  @ApiResponse({
    status: 201,
    description: 'product successfully updated',
    type: CreateProductDto,
  })
  @ApiResponse({
    status: 401,
    description: 'Unathorized',
  })
  @ApiResponse({
    status: 422,
    description: 'Unprocessable entity',
  })
  @ApiResponse({
    status: 404,
    description: 'Not Found',
  })
  updateItem(@Param() id: string, @Body() body: CreateProductDto) {
    return this.productService.updateItem(id, body);
  }
}
