export class FlightTimeByTypeDto {
  type: string;
  minutes: number;
}

export class TotalFlightTimeByTypeDto {
  totalMinutes: number;
  byType: FlightTimeByTypeDto[];
}
