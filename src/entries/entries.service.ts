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

  async create(dto: CreateEntryDto): Promise<EntryDocument> {
    return this.entryModel.create(dto);
  }

  async importEntries(entries: CreateEntryDto[]): Promise<EntryDocument[]> {
    return (await this.entryModel.insertMany(entries)) as unknown as Promise<
      EntryDocument[]
    >;
  }

  async findAll(userId: string, date?: string): Promise<EntryDocument[]> {
    const filter = date ? { date, user: userId } : { user: userId };
    return this.entryModel
      .find(filter)
      .sort({ date: -1, createdAt: -1 })
      .exec();
  }

  async update(
    id: string,
    userId: string,
    dto: UpdateEntryDto,
  ): Promise<EntryDocument> {
    const updatedEntry = await this.entryModel
      .findOneAndUpdate(
        { _id: id, user: userId },
        { $set: dto },
        { returnDocument: 'after', runValidators: true },
      )
      .exec();

    if (!updatedEntry) throw new NotFoundException('Entry not found');
    return updatedEntry;
  }

  async remove(id: string, userId: string) {
    const entry = await this.entryModel.findOneAndDelete({
      _id: id,
      user: userId,
    });
    if (!entry) throw new NotFoundException('Entry not found');
    return { ok: true };
  }
}
