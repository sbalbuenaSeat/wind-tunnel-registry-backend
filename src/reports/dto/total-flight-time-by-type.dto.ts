import { ApiProperty } from '@nestjs/swagger';
import { FlightType } from '../../entries/schemas/entry.schema';

export class FlightTimeByTypeDto {
  @ApiProperty({
    enum: FlightType,
    enumName: 'FlightType',
    example: FlightType.INDIVIDUAL,
    description: 'Flight type',
  })
  type: string;

  @ApiProperty({
    description: 'Duration of the flight in minutes for this type',
    example: 60,
  })
  minutes: number;
}

export class TotalFlightTimeByTypeDto {
  @ApiProperty({
    description: 'Total flight time in minutes across all types',
    example: 120,
  })
  totalMinutes: number;

  @ApiProperty({
    type: [FlightTimeByTypeDto],
    description: 'Detailed breakdown of flight time by each category',
  })
  flightDetails: FlightTimeByTypeDto[];
}
