import { IsOptional } from 'class-validator';
import { Event } from './event';

export class StudentEnrolledEvent extends Event {
  @IsOptional()
  data: any;
}
