import { IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { CreateEntryDto } from './create-entry.dto';
import { ApiProperty } from '@nestjs/swagger';

export class ImportEntriesDto {
  @ApiProperty({
    type: [CreateEntryDto],
    description: 'Array of flight time entries to import',
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateEntryDto)
  entries: CreateEntryDto[];
}
