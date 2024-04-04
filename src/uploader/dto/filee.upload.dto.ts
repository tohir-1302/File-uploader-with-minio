import { IsNotEmpty, IsString } from "class-validator";

export class FileUploadDto {
    
    @IsString()
    @IsNotEmpty()
    bucketName: string
}