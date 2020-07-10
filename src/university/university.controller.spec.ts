import { Test, TestingModule } from '@nestjs/testing';
import { UniversityController } from './university.controller';
import { UniversityService } from './university.service';
import { getModelToken } from '@nestjs/mongoose';

describe('University Controller', () => {
  let controller: UniversityController;

  function mockUniversityModel(dto: any) {
    this.data = dto;
    this.save = () => {
      return this.data;
    };
  }

  function kafkaMock() {
    this.emit = () => {
      return 'event sent';
    };
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UniversityController],
      providers: [
        UniversityService,
        {
          provide: 'KAFKA_SERVICE',
          useValue: kafkaMock,
        },
        {
          provide: getModelToken('Universities'),
          useValue: mockUniversityModel,
        },
      ],
    }).compile();

    controller = module.get<UniversityController>(UniversityController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
