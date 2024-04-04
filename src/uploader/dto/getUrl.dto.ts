import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class GetUrlDto {
    @IsString()
    @IsNotEmpty()
    fileName: string;

    @IsString()
    @IsNotEmpty()
    bucketName: string;

    @IsNumber()
    @IsNotEmpty()
    expire: number;
}