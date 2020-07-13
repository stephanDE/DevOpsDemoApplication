import {
  Controller,
  Get,
  Param,
  Inject,
  UseGuards,
  UseFilters,
  Post,
  Body,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import { ClientKafka } from '@nestjs/microservices';

import { MongoPipe } from '../pipe/mongoid.pipe';
import { KafkaTopic } from '../kafka/kafkaTopic.decorator';
import { Cmd } from '../kafka/command.decorator';
import { Roles } from '../auth/auth.decorator';
import { RoleGuard } from '../auth/auth.guard';
import { ExceptionFilter } from '../kafka/kafka.exception.filter';
import { Command } from './commands/command';
import { CreateUniversityDto } from './dto/createUniversity.dto';
import { Event } from './events/event';
import { Config } from '../config/config.interface';
import { CommandHandler } from './commands/command.handler';
import { EventHandler } from './events/event.handler';
import { Evt } from '../kafka/event.decorator';
import { University } from './university.schema';
import { UniversityService } from './university.service';

@Controller('university')
//@UseGuards(RoleGuard)
@UseFilters(ExceptionFilter)
export class UniversityController {
  constructor(
    @Inject('KAFKA_SERVICE') private kafkaClient: ClientKafka,
    @Inject('CONFIG') private config: Config,
    private commandHandler: CommandHandler,
    private eventHandler: EventHandler,
    private universityService: UniversityService,
  ) {}

  // ---------------- REST --------------------

  @Post('')
  @Roles('create')
  @UsePipes(ValidationPipe)
  async createOne(@Body() dto: CreateUniversityDto): Promise<University> {
    console.log('bis hierhin gehts');
    const university: University = await this.universityService.createOne(dto);

    const event = {
      id: uuid(),
      type: 'event',
      action: 'UniversityCreated',
      timestamp: Date.now(),
      data: university,
    };

    console.log(`created university with: ${event}`);

    this.kafkaClient.emit(
      `${this.config.kafka.prefix}-university-event`,
      event,
    );

    return university;
  }

  @Roles('read')
  @Get()
  async getAll(): Promise<University[]> {
    return this.universityService.findAll();
  }

  @Get('/:id')
  async getOne(@Param('id', new MongoPipe()) id: string) {
    return this.universityService.findOne(id);
  }

  // ---------------- CRQS --------------------

  @KafkaTopic(`university-command`) async onCommand(
    @Cmd() command: Command,
  ): Promise<void> {
    const university: University = await this.commandHandler.handler(command);

    const event = {
      id: uuid(),
      type: 'event',
      action: 'UniversityCreated',
      timestamp: Date.now(),
      data: university,
    };

    this.kafkaClient.emit(
      `${this.config.kafka.prefix}-university-event`,
      event,
    );

    return;
  }

  @KafkaTopic('student-event') async onStudentEvent(
    @Evt() event: Event,
  ): Promise<void> {
    await this.eventHandler.handleEvent(event);
    return;
  }
}
