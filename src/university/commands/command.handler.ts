import { Injectable } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';

import { UniversityService } from '../university.service';
import { University } from '../university.schema';
import { Command } from './command';
import { CreateUniversityCommand } from './createUniversity.command';

@Injectable()
export class CommandHandler {
  constructor(private universityService: UniversityService) {}

  async handler(command: Command): Promise<University> {
    switch (command.action) {
      case 'CreateUniversity':
        return this.handleCreateUniversityCommand(
          command as CreateUniversityCommand,
        );
      default:
        throw new RpcException(`Unsupported command action ${command.action}`);
    }
  }

  private async handleCreateUniversityCommand(
    command: CreateUniversityCommand,
  ) {
    return this.universityService.createOne(command.data);
  }
}
