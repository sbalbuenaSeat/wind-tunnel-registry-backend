import { ApiProperty } from '@nestjs/swagger';

export class TotalFlightTimeDto {
  @ApiProperty({
    description: 'Total flight time in minutes',
    example: 120,
  })
  totalMinutes: number;
}
