import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Entry, EntryDocument } from '../entries/schemas/entry.schema';
import { Model } from 'mongoose';

@Injectable()
export class ReportsService {
  constructor(
    @InjectModel(Entry.name) private readonly entryModel: Model<EntryDocument>,
  ) {}

  async totalFlightTime(date?: string): Promise<{ totalMinutes: number }> {
    const match = date ? { date } : {};

    const res = await this.entryModel.aggregate<{ totalMinutes: number }>([
      { $match: match },
      {
        $group: {
          _id: null,
          totalMinutes: { $sum: '$minutes' },
        },
      },
    ]);

    return { totalMinutes: res[0]?.totalMinutes ?? 0 };
  }

  async totalFlightTimeByType(date?: string): Promise<{
    totalMinutes: number;
    byType: { type: string; minutes: number }[];
  }> {
    const match = date ? { date } : {};

    const res = await this.entryModel.aggregate<{
      type: string;
      minutes: number;
    }>([
      { $match: match },
      {
        $group: {
          _id: '$type',
          minutes: { $sum: '$minutes' },
        },
      },
      { $project: { _id: 0, type: '$_id', minutes: 1 } },
      { $sort: { minutes: -1 } },
    ]);

    const totalMinutes = res.reduce((acc, x) => acc + x.minutes, 0);

    return { totalMinutes, byType: res };
  }
}
