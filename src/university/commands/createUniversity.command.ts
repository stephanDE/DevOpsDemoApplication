import { Command } from './command';
import { IsNotEmpty, ValidateNested, IsString } from 'class-validator';
import { Type } from 'class-transformer';

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
