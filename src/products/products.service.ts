import { Injectable, NotFoundException } from '@nestjs/common';

import { Product } from './products.model';

@Injectable()
export class ProductsService {
  private products: Product[] = [];
  private id = 0;

  insertProduct(title: string, description: string, price: number): number {
    this.id++;
    const newProduct = new Product(this.id, title, description, price);
    this.products.push(newProduct);
    return this.id;
  }

  getAllProducts(): Product[] {
    return [...this.products];
  }

  getProductById(id: number): Product {
    const [product] = this.findProduct(id);
    return { ...product };
  }

  updateProduct(
    id: number,
    title: string,
    description: string,
    price: number,
  ): Product {
    const [product, index] = this.findProduct(id);
    const updatedProduct = { ...product };
    if (title) {
      updatedProduct.title = title;
    }
    if (description) {
      updatedProduct.description = description;
    }
    if (price) {
      updatedProduct.price = price;
    }
    this.products[index] = updatedProduct;
    return updatedProduct;
  }

  deleteProduct(id: number) {
    const [, index] = this.findProduct(id);
    this.products.splice(index, 1);
  }

  private findProduct(id: number): [Product, number] {
    const index = this.products.findIndex((product) => product.id == id);
    const product = this.products[index];
    if (!product) {
      throw new NotFoundException('Could not find product.');
    }

    return [product, index];
  }
}
