// cloudinary.module.ts
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Cloudinary } from 'cloudinary-core';

@Module({
  imports: [ConfigModule],
  providers: [
    {
      provide: 'CLOUDINARY',
      useFactory: (configService: ConfigService) => {
        return new Cloudinary({
          cloud_name: configService.get('djdpj9pmk'),
          api_key: configService.get('532192157621478'),
          api_secret: configService.get('k-qv0DKvYLS2uWf8RzjpOuWUs48'),
        });
      },
      inject: [ConfigService],
    },
  ],
  exports: ['CLOUDINARY'],
})
export class CloudinaryModule {}
