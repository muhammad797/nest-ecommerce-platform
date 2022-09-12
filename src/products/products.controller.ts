import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { Product } from './products.model';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  addProduct(
    @Body('title') title: string,
    @Body('description') description: string,
    @Body('price') price: number,
  ): { id: number } {
    const productId = this.productsService.insertProduct(
      title,
      description,
      price,
    );
    return { id: productId };
  }

  @Get()
  getProducts(): Product[] {
    return this.productsService.getAllProducts();
  }

  @Get(':id')
  getProductById(@Param('id') id: number): Product {
    return this.productsService.getProductById(id);
  }

  @Patch(':id')
  updateProduct(
    @Param('id') id: number,
    @Body('title') title: string,
    @Body('description') description: string,
    @Body('price') price: number,
  ): Product {
    return this.productsService.updateProduct(id, title, description, price);
  }

  @Delete(':id')
  deleteProduct(@Param('id') id: number) {
    this.productsService.deleteProduct(id);
    return null;
  }
}
