import { Controller, Get, Query } from '@nestjs/common';
import { ReportsService } from './reports.service';

@Controller('reports')
export class ReportsController {
  constructor(private readonly reportsService: ReportsService) {}

  @Get('total')
  getTotal(@Query('date') date?: string) {
    return this.reportsService.totalFlightTime(date);
  }

  @Get('by-type')
  getReportByType(@Query('date') date?: string) {
    return this.reportsService.totalFlightTimeByType(date);
  }
}
