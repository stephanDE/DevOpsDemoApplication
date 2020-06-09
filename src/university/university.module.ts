import { Module } from '@nestjs/common';
import { UniversityController } from './university.controller';
import { UniversityService } from './university.service';
import { ConfigModule } from 'src/config/config.module';

@Module({
  imports: [ConfigModule.forRoot(), UniversityModule],
  controllers: [UniversityController],
  providers: [UniversityService],
})
export class UniversityModule {}
