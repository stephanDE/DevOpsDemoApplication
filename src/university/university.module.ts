import { Module } from '@nestjs/common';
import { UniversityController } from './university.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UniversitySchema } from './university.schema';
import { LoggingModule } from '../logging/logging.module';
import { UniversityService } from './university.service';
import { CommandHandler } from './commands/command.handler';
import { EventHandler } from './events/event.handler';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'Universities',
        schema: UniversitySchema,
      },
    ]),
    LoggingModule,
  ],
  controllers: [UniversityController],
  providers: [UniversityService, CommandHandler, EventHandler],
})
export class UniversityModule {}
