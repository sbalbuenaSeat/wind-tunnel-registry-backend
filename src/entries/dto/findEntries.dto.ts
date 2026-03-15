import { FlightType } from '../schemas/entry.schema';
import { IsDateString, IsEnum, IsOptional, IsString } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class FindEntriesDto {
  @ApiPropertyOptional({
    example: '2026-03-15',
    description: 'Filter by date in YYYY-MM-DD format',
  })
  @IsOptional()
  @IsDateString()
  date?: string;

  @ApiPropertyOptional({
    enum: FlightType,
    enumName: 'FlightType',
    example: FlightType.INDIVIDUAL,
    description: 'Filter by flight type',
  })
  @IsOptional()
  @IsString()
  @IsEnum(FlightType)
  type?: FlightType;
}
