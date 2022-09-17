import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product } from './products.model';

@Injectable()
export class ProductsService {
  // private products: Product[] = [];

  constructor(
    @InjectModel('Product') private readonly productModel: Model<Product>,
  ) {}

  async insertProduct(
    title: string,
    description: string,
    price: number,
  ): Promise<string> {
    const newProduct = new this.productModel({ title, description, price });
    const result = await newProduct.save();
    return result.id as string;
  }

  async getAllProducts(): Promise<Product[]> {
    const products = await this.productModel.find().exec();
    return products as Product[];
  }

  async getProductById(id: number): Promise<Product> {
    // const [product] = await this.findProduct(id);
    // return { ...product };
    return null;
  }

  // updateProduct(
  //   id: number,
  //   title: string,
  //   description: string,
  //   price: number,
  // ): Product {
  //   const [product, index] = this.findProduct(id);
  //   const updatedProduct = { ...product };
  //   if (title) {
  //     updatedProduct.title = title;
  //   }
  //   if (description) {
  //     updatedProduct.description = description;
  //   }
  //   if (price) {
  //     updatedProduct.price = price;
  //   }
  //   this.products[index] = updatedProduct;
  //   return updatedProduct;
  // }

  // deleteProduct(id: number) {
  //   const [, index] = this.findProduct(id);
  //   this.products.splice(index, 1);
  // }

  // private findProduct(id: number): [Product, number] {
  //   const index = this.products.findIndex((product) => product.id == id);
  //   const product = this.products[index];
  //   if (!product) {
  //     throw new NotFoundException('Could not find product.');
  //   }

  //   return [product, index];
  // }
}
