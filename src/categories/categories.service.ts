import { Body, Injectable, Post } from '@nestjs/common';
import { Category } from './categories.model';

@Injectable()
export class CategoriesService {
  private categories: Category[] = [];

  findAll() {
    return [];
  }

  create(name: string) {
    this.categories.push({ id: `${Date.now()}`, name });
  }
}
