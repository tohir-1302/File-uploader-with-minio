import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import * as Minio from 'minio'
import { GetUrlDto } from 'src/uploader/dto/getUrl.dto'

@Injectable()
export class MinioService {
  private minioClient: Minio.Client

  constructor(private readonly configService: ConfigService) {
    this.minioClient = new Minio.Client({
      endPoint: this.configService.get('MINIO_ENDPOINT'),
      port: Number(this.configService.get('MINIO_PORT')),
      useSSL: this.configService.get('MINIO_USE_SSL') === 'true',
      accessKey: this.configService.get('MINIO_ACCESS_KEY'),
      secretKey: this.configService.get('MINIO_SECRET_KEY'),
    })
  }

  async createBucketIfNotExists(bucketName: string) {
    
    const bucketExists = await this.minioClient.bucketExists(bucketName)
    if (!bucketExists) {
      await this.minioClient.makeBucket(bucketName, 'eu-west-1', function (err) {
        if (err) { return console.log('Error creating bucket. ', err) }
        console.log('Bucket created successfully in "us-east-1".');
      })
    }
  }

  async uploadFile(file: Express.Multer.File, bucketName: string) {
    const fileName = `${Date.now()}-${file.originalname}`
    await this.minioClient.putObject(
      bucketName,
      fileName,
      file.buffer,
      file.size
    )
    return fileName
  }

  async getFileUrl(dto: GetUrlDto): Promise<string>{
    return await this.minioClient.presignedUrl(
      'GET',
      dto.bucketName, 
      dto.fileName,
      +dto.expire,
    )
  }

  async deleteFile(fileName: string, bucketName: string) {
    await this.minioClient.removeObject(bucketName, fileName)
  }
}
