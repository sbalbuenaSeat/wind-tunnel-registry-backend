import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Entry, EntryDocument } from './schemas/entry.schema';
import { Model } from 'mongoose';
import { CreateEntryDto } from './dto/create-entry.dto';

@Injectable()
export class EntriesService {
  constructor(
    @InjectModel(Entry.name) private readonly entryModel: Model<EntryDocument>,
  ) {}

  async create(dto: CreateEntryDto): Promise<Entry> {
    return this.entryModel.create(dto);
  }

  async findAll(date?: string): Promise<Entry[]> {
    const filter = date ? { date } : {};
    return this.entryModel
      .find(filter)
      .sort({ date: -1, createdAt: -1 })
      .exec();
  }
}
