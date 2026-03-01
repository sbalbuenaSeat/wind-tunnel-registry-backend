import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { EntriesService } from './entries.service';
import { CreateEntryDto } from './dto/create-entry.dto';
import { UpdateEntryDto } from './dto/update-entry.dto';

@Controller('entries')
export class EntriesController {
  constructor(private readonly service: EntriesService) {}

  @Post()
  create(@Body() dto: CreateEntryDto) {
    return this.service.create(dto);
  }

  @Get()
  list(@Query('date') date?: string) {
    return this.service.findAll(date);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateEntryDto) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }
}
