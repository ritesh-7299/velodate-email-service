import { IsDate, IsOptional, IsString } from 'class-validator';

export class SendEmailDto {
  @IsString()
  title: string;

  @IsString()
  message: string;

  @IsString()
  target_to: string;

  @IsOptional()
  @IsString()
  file: string;
}
