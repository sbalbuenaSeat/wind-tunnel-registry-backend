import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Entry, EntryDocument } from './schemas/entry.schema';
import { Model } from 'mongoose';
import { CreateEntryDto } from './dto/create-entry.dto';
import { UpdateEntryDto } from './dto/update-entry.dto';

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

  async update(id: string, dto: UpdateEntryDto): Promise<Entry> {
    const updatedEntry = await this.entryModel
      .findByIdAndUpdate(
        id,
        { $set: dto },
        { returnDocument: 'after', runValidators: true },
      )
      .exec();

    if (!updatedEntry) throw new NotFoundException('Entry not found');
    return updatedEntry;
  }

  async remove(id: string) {
    const entry = await this.entryModel.findByIdAndDelete(id);
    if (!entry) throw new NotFoundException('Entry not found');
    return { ok: true };
  }
}
