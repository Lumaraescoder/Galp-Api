import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { StakeholdersModule } from './stackholder/stackeholder.module';
import { FilesService } from './files/files.service';
@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://lumaraess:biwPKBf9oJQbHmT0@cluster0.qrvekqy.mongodb.net/',
    ),
    StakeholdersModule,
  ],
  controllers: [AppController],
  providers: [AppService, FilesService],
})
export class AppModule {}
