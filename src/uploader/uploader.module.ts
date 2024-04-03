import { Module } from '@nestjs/common';
import { UploaderService } from './uploader.service';
import { UploaderController } from './uploader.controller';
import { MinioService } from 'src/minio/minio.service';

@Module({
  controllers: [UploaderController],
  providers: [UploaderService, MinioService],
})
export class UploaderModule {}
