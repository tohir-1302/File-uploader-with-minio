import { PartialType } from '@nestjs/mapped-types';
import { CreateUploaderDto } from './create-uploader.dto';

export class UpdateUploaderDto extends PartialType(CreateUploaderDto) {}
