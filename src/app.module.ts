import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { StackholdersModule } from './products/stackeholder.module';
@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://lumaraess:biwPKBf9oJQbHmT0@cluster0.qrvekqy.mongodb.net/',
    ),
    StackholdersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
