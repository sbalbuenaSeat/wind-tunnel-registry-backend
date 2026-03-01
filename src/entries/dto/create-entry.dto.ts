import {
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  Max,
  Min,
  IsDateString,
  IsMongoId,
} from 'class-validator';
import { FlightType } from '../schemas/entry.schema';

export class CreateEntryDto {
  @IsEnum(FlightType)
  @IsNotEmpty()
  type: FlightType;

  @IsDateString()
  @IsNotEmpty()
  date: string;

  @IsInt()
  @Min(1)
  @Max(1440)
  minutes: number;

  @IsString()
  @IsOptional()
  note?: string;

  @IsMongoId()
  @IsOptional()
  user?: string;
}
