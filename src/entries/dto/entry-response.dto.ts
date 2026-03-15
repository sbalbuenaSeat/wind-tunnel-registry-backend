import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { FlightType } from '../schemas/entry.schema';

export class EntryResponseDto {
  @ApiProperty({
    description: 'Unique identifier of the entry',
    example: '60d5ecb8b39c0c001f8e4e1a',
  })
  id: string;

  @ApiProperty({
    enum: FlightType,
    enumName: 'FlightType',
    example: FlightType.INDIVIDUAL,
    description: 'Flight type',
  })
  type: FlightType;

  @ApiProperty({
    description: 'Date of the flight in YYYY-MM-DD format',
    example: '2026-03-15',
  })
  date: string;

  @ApiProperty({
    description: 'Duration of the flight in minutes',
    example: 30,
  })
  minutes: number;

  @ApiPropertyOptional({
    description: 'Additional notes about the flight',
    example: 'Great session!',
  })
  note?: string;
}
