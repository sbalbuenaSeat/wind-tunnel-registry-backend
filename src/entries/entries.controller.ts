import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
  Req,
} from '@nestjs/common';
import { EntriesService } from './entries.service';
import { CreateEntryDto } from './dto/create-entry.dto';
import { UpdateEntryDto } from './dto/update-entry.dto';
import { ImportEntriesDto } from './dto/import-entries.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import type { Request } from 'express';
import { UserDocument } from '../users/schemas/user.schema';

@Controller('entries')
@UseGuards(JwtAuthGuard)
export class EntriesController {
  constructor(private readonly service: EntriesService) {}

  @Post()
  create(@Body() dto: CreateEntryDto, @Req() req: Request) {
    const user = req.user as UserDocument;
    dto.user = user._id.toString();
    return this.service.create(dto);
  }

  @Post('import')
  import(@Body() dto: ImportEntriesDto, @Req() req: Request) {
    const user = req.user as UserDocument;
    dto.entries.forEach((entry) => (entry.user = user._id.toString()));
    return this.service.importEntries(dto.entries);
  }

  @Get()
  list(@Query('date') date: string | undefined, @Req() req: Request) {
    const user = req.user as UserDocument;
    return this.service.findAll(user._id.toString(), date);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() dto: UpdateEntryDto,
    @Req() req: Request,
  ) {
    const user = req.user as UserDocument;
    return this.service.update(id, user._id.toString(), dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Req() req: Request) {
    const user = req.user as UserDocument;
    return this.service.remove(id, user._id.toString());
  }
}
