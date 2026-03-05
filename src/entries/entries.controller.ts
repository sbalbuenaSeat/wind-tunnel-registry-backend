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
import {
  ApiCookieAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { EntryResponseDto } from './dto/entry-response.dto';

@ApiTags('Entries')
@ApiCookieAuth('access_token')
@Controller('entries')
@UseGuards(JwtAuthGuard)
export class EntriesController {
  constructor(private readonly service: EntriesService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new flight time entry' })
  @ApiResponse({ status: 201, type: EntryResponseDto })
  create(@Body() dto: CreateEntryDto, @Req() req: Request) {
    const user = req.user as UserDocument;
    return this.service.create(user._id.toString(), dto);
  }

  @Post('import')
  @ApiOperation({ summary: 'Import multiple flight time entries' })
  @ApiResponse({ status: 201, type: [EntryResponseDto] })
  import(@Body() dto: ImportEntriesDto, @Req() req: Request) {
    const user = req.user as UserDocument;
    return this.service.importEntries(user._id.toString(), dto.entries);
  }

  @Get()
  @ApiOperation({ summary: 'List all flight time entries for the user' })
  @ApiResponse({ status: 200, type: [EntryResponseDto] })
  list(@Query('date') date: string | undefined, @Req() req: Request) {
    const user = req.user as UserDocument;
    return this.service.findAll(user._id.toString(), date);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a flight time entry' })
  @ApiResponse({ status: 200, type: EntryResponseDto })
  @ApiResponse({ status: 404, description: 'Entry not found' })
  update(
    @Param('id') id: string,
    @Body() dto: UpdateEntryDto,
    @Req() req: Request,
  ) {
    const user = req.user as UserDocument;
    return this.service.update(id, user._id.toString(), dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a flight time entry' })
  @ApiResponse({ status: 200, description: 'Entry deleted successfully' })
  @ApiResponse({ status: 404, description: 'Entry not found' })
  remove(@Param('id') id: string, @Req() req: Request) {
    const user = req.user as UserDocument;
    return this.service.remove(id, user._id.toString());
  }
}
