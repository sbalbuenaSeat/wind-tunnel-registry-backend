import { FlightType } from '../schemas/entry.schema';

export class EntryResponseDto {
  id: string;
  type: FlightType;
  date: string;
  minutes: number;
  note?: string;
}
