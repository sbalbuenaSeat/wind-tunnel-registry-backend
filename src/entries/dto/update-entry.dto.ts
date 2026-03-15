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
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateEntryDto {
  @ApiPropertyOptional({
    enum: FlightType,
    enumName: 'FlightType',
    example: FlightType.INDIVIDUAL,
    description: 'Flight type',
  })
  @IsEnum(FlightType)
  @IsOptional()
  type?: FlightType;

  @ApiPropertyOptional({
    description: 'Date of the flight in YYYY-MM-DD format',
    example: '2026-03-15',
  })
  @IsDateString()
  @IsOptional()
  date?: string;

  @ApiPropertyOptional({
    description: 'Duration of the flight in minutes',
    example: 30,
    minimum: 1,
    maximum: 1440,
  })
  @IsInt()
  @Min(1)
  @Max(1440)
  @IsOptional()
  minutes?: number;

  @ApiPropertyOptional({
    description: 'Additional notes about the flight',
    example: 'Training session with coach',
  })
  @IsString()
  @IsOptional()
  note?: string;
}
