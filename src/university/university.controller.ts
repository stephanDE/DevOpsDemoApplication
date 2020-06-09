import { Controller, Get } from '@nestjs/common';

@Controller('university')
export class UniversityController {
  @Get()
  async sayHello(): Promise<string> {
    return 'Hallöchen';
  }
}
