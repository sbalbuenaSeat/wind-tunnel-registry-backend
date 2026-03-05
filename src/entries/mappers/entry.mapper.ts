import { EntryDocument } from '../schemas/entry.schema';
import { EntryResponseDto } from '../dto/entry-response.dto';

export function mapEntryToResponse(entry: EntryDocument): EntryResponseDto {
  return {
    id: entry._id.toString(),
    type: entry.type,
    date: entry.date,
    minutes: entry.minutes,
    note: entry.note,
  };
}
