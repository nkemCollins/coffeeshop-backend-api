import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './product.entity';
import { CreateProductDto } from './dtos/create-product.dto';
import { User } from 'src/users/user.entity';
import { ObjectId } from 'mongodb';
import { IsObject } from 'class-validator';

@Injectable()
export class ProductService {
  constructor(@InjectRepository(Product) private repo: Repository<Product>) {}

  create(productDto: CreateProductDto, user: User) {
    const product = this.repo.create(productDto);
    product.user = user;

    return this.repo.save(product);
  }

  async findProducts(id: string) {
    if (!id) {
      return null;
    }

    const userId = new ObjectId(id);

    const products = await this.repo.find({
      where: { 'user._id': userId } as any,
    });
    return products;
  }

  async findOneProduct(id: string) {
    if (!id) {
      return null;
    }

    const productId = new ObjectId(id);

    return this.repo.findOne({
      where: { _id: productId },
    });
  }

  async deleteItem(id: string) {
    const product = await this.findOneProduct(id);
    if (!product) {
      throw new NotFoundException('item not found');
    }

    return this.repo.remove(product);
  }

  async updateItem(id: string, attrs: Partial<Product>) {
    const product = await this.findOneProduct(id);
    if (!product) {
      throw new NotFoundException('item no found');
    }

    Object.assign(product, attrs);
    return this.repo.save(product);
  }
}
