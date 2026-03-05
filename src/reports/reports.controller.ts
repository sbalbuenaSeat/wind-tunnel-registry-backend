import { Controller, Get, Query, UseGuards, Req } from '@nestjs/common';
import { ReportsService } from './reports.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import type { Request } from 'express';
import { UserDocument } from '../users/schemas/user.schema';
import {
  ApiCookieAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { TotalFlightTimeDto } from './dto/total-flight-time.dto';
import { TotalFlightTimeByTypeDto } from './dto/total-flight-time-by-type.dto';

@ApiTags('Reports')
@ApiCookieAuth('access_token')
@Controller('reports')
@UseGuards(JwtAuthGuard)
export class ReportsController {
  constructor(private readonly reportsService: ReportsService) {}

  @Get('total')
  @ApiOperation({ summary: 'Get total flight time' })
  @ApiResponse({ status: 200, type: TotalFlightTimeDto })
  getTotal(@Query('date') date: string | undefined, @Req() req: Request) {
    const user = req.user as UserDocument;
    return this.reportsService.totalFlightTime(user._id.toString(), date);
  }

  @Get('total-by-type')
  @ApiOperation({ summary: 'Get total flight time grouped by type' })
  @ApiResponse({ status: 200, type: TotalFlightTimeByTypeDto })
  getReportByType(
    @Query('date') date: string | undefined,
    @Req() req: Request,
  ) {
    const user = req.user as UserDocument;
    return this.reportsService.totalFlightTimeByType(user._id.toString(), date);
  }
}
