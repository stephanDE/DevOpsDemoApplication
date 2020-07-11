import { Injectable } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { StudentEnrolledEvent } from './studentEnrolled.event';

import { UniversityService } from '../university.service';
import { University } from '../university.schema';
import { Event } from '../events/event';

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
