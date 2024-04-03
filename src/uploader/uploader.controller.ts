import { Controller, Post, UseInterceptors, UploadedFile } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { MinioService } from 'src/minio/minio.service';

@Controller('uploader')
export class UploaderController {
  constructor(private readonly minioService: MinioService) {}

  @Post('add')
  @UseInterceptors(FileInterceptor('file'))
  async add(@UploadedFile() file: Express.Multer.File) {
    await this.minioService.createBucketIfNotExists()
    const fileName = await this.minioService.uploadFile(file)
    return fileName
  }
}
