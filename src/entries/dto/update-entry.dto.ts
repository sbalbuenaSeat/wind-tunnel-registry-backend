import {
  IsDateString,
  IsEnum,
  IsInt,
  IsOptional,
  IsString,
  Max,
  Min,
} from 'class-validator';
import { FlightType } from '../schemas/entry.schema';

export class UpdateEntryDto {
  @IsEnum(FlightType)
  @IsOptional()
  type?: FlightType;

  @IsDateString()
  @IsOptional()
  date?: string;

  @IsInt()
  @Min(1)
  @Max(1440)
  @IsOptional()
  minutes?: number;

  @IsString()
  @IsOptional()
  note?: string;
}
