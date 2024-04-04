import { Injectable } from '@nestjs/common';
import { MinioService } from 'src/minio/minio.service';
import { GetUrlDto } from './dto/getUrl.dto';

@Injectable()
export class UploaderService {
  constructor(
    private readonly minioService: MinioService,
  ) { }

  async uploadFile(file: Express.Multer.File, bucketName: string): Promise<string> {
    await this.minioService.createBucketIfNotExists(bucketName)
    const fileName = await this.minioService.uploadFile(file, bucketName)
    return fileName
  }

  async getUrl(dto: GetUrlDto) {
    return this.minioService.getFileUrl(dto)
  }
}
