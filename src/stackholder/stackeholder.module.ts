import { Module } from '@nestjs/common';

import { MongooseModule } from '@nestjs/mongoose';
import { StakeholderSchema } from './strackeholder.model';
import { StakeholderService } from './stackeholder.service';
import { StakeholdersController } from './stackeholder.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Stakeholder', schema: StakeholderSchema },
    ]),
  ],
  providers: [StakeholderService],
  controllers: [StakeholdersController],
})
export class StakeholdersModule {}
