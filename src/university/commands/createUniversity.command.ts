import { IsNotEmpty, ValidateNested, IsString } from 'class-validator';
import { Type } from 'class-transformer';

import { Command } from './command';

class University {
  @IsNotEmpty()
  @IsString()
  readonly address;
}

export class CreateUniversityCommand extends Command {
  @IsNotEmpty()
  @ValidateNested()
  @Type(() => University)
  readonly data: University;
}
