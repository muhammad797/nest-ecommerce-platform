import { Test, TestingModule } from '@nestjs/testing';
import { CategoriesController } from './categories.controller';
import { CategoriesService } from './categories.service';

describe('CategoriesController', () => {
  let controller: CategoriesController;

  const categoriesMockService = {
    findAll: jest.fn(() => {
      return [];
    }),
    create: jest.fn((dto) => {
      return {
        id: `${Date.now()}`,
        ...dto,
      };
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CategoriesController],
      providers: [CategoriesService],
    })
      .overrideProvider(CategoriesService)
      .useValue(categoriesMockService)
      .compile();

    controller = module.get<CategoriesController>(CategoriesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a category', () => {
    const dto = { name: 'Hello World' };
    expect(controller.create(dto)).toEqual({
      id: expect.any(String),
      name: dto.name,
    });
    expect(categoriesMockService.create).toHaveBeenCalled();
    expect(categoriesMockService.create).toHaveBeenCalledWith(dto);
  });
});
