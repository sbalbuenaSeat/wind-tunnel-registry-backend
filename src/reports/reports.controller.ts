import { Controller, Get, Query, UseGuards, Req } from '@nestjs/common';
import { ReportsService } from './reports.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import type { Request } from 'express';
import { UserDocument } from '../users/schemas/user.schema';

@Controller('reports')
@UseGuards(JwtAuthGuard)
export class ReportsController {
  constructor(private readonly reportsService: ReportsService) {}

  @Get('total')
  getTotal(@Query('date') date: string | undefined, @Req() req: Request) {
    const user = req.user as UserDocument;
    return this.reportsService.totalFlightTime(user._id.toString(), date);
  }

  @Get('total-by-type')
  getReportByType(
    @Query('date') date: string | undefined,
    @Req() req: Request,
  ) {
    const user = req.user as UserDocument;
    return this.reportsService.totalFlightTimeByType(user._id.toString(), date);
  }
}
