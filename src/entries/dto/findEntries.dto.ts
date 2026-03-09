import { FlightType } from '../schemas/entry.schema';
import { IsDateString, IsEnum, IsOptional, IsString } from 'class-validator';

export class FindEntriesDto {
  @IsOptional()
  @IsDateString()
  date?: string;

  @IsOptional()
  @IsString()
  @IsEnum(FlightType)
  type?: FlightType;
}
