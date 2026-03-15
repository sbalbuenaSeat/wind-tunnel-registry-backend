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
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateEntryDto {
  @ApiProperty({
    enum: FlightType,
    enumName: 'FlightType',
    example: FlightType.INDIVIDUAL,
    description: 'Flight type',
  })
  @IsEnum(FlightType)
  @IsNotEmpty()
  type: FlightType;

  @ApiProperty({
    description: 'Date of the flight in YYYY-MM-DD format',
    example: '2026-03-15',
  })
  @IsDateString()
  @IsNotEmpty()
  date: string;

  @ApiProperty({
    description: 'Duration of the flight in minutes',
    example: 30,
    minimum: 1,
    maximum: 1440,
  })
  @IsInt()
  @Min(1)
  @Max(1440)
  minutes: number;

  @ApiPropertyOptional({
    description: 'Additional notes about the flight',
    example: 'First time at the wind tunnel',
  })
  @IsString()
  @IsOptional()
  note?: string;

  @ApiPropertyOptional({
    description: 'User ID associated with the entry',
    example: '60d5ecb8b39c0c001f8e4e1a',
  })
  @IsMongoId()
  @IsOptional()
  user?: string;
}
