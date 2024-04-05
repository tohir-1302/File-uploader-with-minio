import { Controller, Post, UseInterceptors, UploadedFile, Param, Get, Query, Body, NotFoundException } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploaderService } from './uploader.service';
import { GetUrlDto } from './dto/getUrl.dto';
import { FileUploadDto } from './dto/filee.upload.dto';

@Controller('uploader')
export class UploaderController {
  constructor(
    private readonly service: UploaderService
  ) { }

  @Post('add')
  @UseInterceptors(FileInterceptor('file'))
  async add(@UploadedFile() file: Express.Multer.File, @Body() dto: FileUploadDto) {
    try {
      return await this.service.uploadFile(file, dto.bucketName);
    } catch (error) {
      throw new NotFoundException(error)
    }
  }

  @Get('get-url')
  async getUrl(@Query() dto: GetUrlDto) {
    try {
      return await this.service.getUrl(dto)
    } catch (error) {
      throw new NotFoundException(error)
    }
  }
}
