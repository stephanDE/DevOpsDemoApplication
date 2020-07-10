import { Injectable } from '@nestjs/common';
import { UniversityService } from '../university.service';
import { University } from '../university.schema';
import { plainToClass } from 'class-transformer';
import { RpcException } from '@nestjs/microservices';
import { Event } from '../events/event';
import { StudentEnrolledEvent } from './studentEnrolled.event';
@Injectable()
export class EventHandler {
  constructor(private universityService: UniversityService) {}

  async handleEvent(event: Event): Promise<University> {
    switch (event.action) {
      case 'StudentEnrolled': {
        return this.handleStudentEnrolledEvent(event as StudentEnrolledEvent);
      }

      default:
        throw new RpcException(`Unsupported event action: ${event.action}`);
    }
  }

  private async handleStudentEnrolledEvent(
    event: StudentEnrolledEvent,
  ): Promise<University> {
    return this.universityService.enroll(event.data);
  }
}
