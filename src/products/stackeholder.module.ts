import { Module } from '@nestjs/common';

import { MongooseModule } from '@nestjs/mongoose';
import { StackholderService } from './stackeholder.service';
import { StackHolderSchema } from './strackeholder.model';
import { StackholdersController } from './stackeholder.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Stackholder', schema: StackHolderSchema },
    ]),
  ],
  providers: [StackholderService],
  controllers: [StackholdersController],
})
export class StackholdersModule {}
