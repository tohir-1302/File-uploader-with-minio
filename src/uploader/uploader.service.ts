import { Injectable } from '@nestjs/common';
import { CreateUploaderDto } from './dto/create-uploader.dto';
import { UpdateUploaderDto } from './dto/update-uploader.dto';

@Injectable()
export class UploaderService {
  create(createUploaderDto: CreateUploaderDto) {
    return 'This action adds a new uploader';
  }

  findAll() {
    return `This action returns all uploader`;
  }

  findOne(id: number) {
    return `This action returns a #${id} uploader`;
  }

  update(id: number, updateUploaderDto: UpdateUploaderDto) {
    return `This action updates a #${id} uploader`;
  }

  remove(id: number) {
    return `This action removes a #${id} uploader`;
  }
}
