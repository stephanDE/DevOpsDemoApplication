import { Test, TestingModule } from '@nestjs/testing';
import { UniversityService } from './university.service';
import { getModelToken } from '@nestjs/mongoose';

describe('UniversityService', () => {
  let service: UniversityService;

  function mockUniversityModel(dto: any) {
    this.data = dto;

    this.save = () => {
      return this.data;
    };
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UniversityService,
        {
          provide: getModelToken('Universities'),
          useValue: mockUniversityModel,
        },
      ],
    }).compile();

    service = module.get<UniversityService>(UniversityService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
