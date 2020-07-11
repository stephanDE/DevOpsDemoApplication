import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { University } from './university.schema';
import { CreateUniversityDto } from './dto/CreateUniversity.dto';
import { StudentEnrolledEvent } from './events/studentEnrolled.event';

@Injectable()
export class UniversityService {
  constructor(
    @InjectModel('Universities') private uniModel: Model<University>,
  ) {}

  async findAll(): Promise<University[]> {
    return this.uniModel.find().exec();
  }

  async findOne(id: string): Promise<University> {
    return this.uniModel.findById(id).exec();
  }

  async createOne(dto: CreateUniversityDto): Promise<University> {
    return this.uniModel.create(dto);
  }

  async enroll(event: StudentEnrolledEvent): Promise<University> {
    return this.uniModel.find().exec()[0];
  }
}
