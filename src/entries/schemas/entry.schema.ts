import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type EntryDocument = HydratedDocument<Entry>;

export enum FlightType {
  INDIVIDUAL = 'INDIVIDUAL',
  SHARED = 'SHARED',
}

@Schema({ timestamps: true })
export class Entry {
  @Prop({ type: String, require: true, enum: FlightType, index: true })
  type: FlightType;

  @Prop({ type: String, require: true, enum: FlightType, index: true })
  date: string;

  @Prop({ type: String, require: true, min: 1, max: 24 * 60 })
  minutes: string;

  @Prop({ type: String })
  note?: string;
}

export const EntrySchema = SchemaFactory.createForClass(Entry);

EntrySchema.index({ date: 1, type: 1 });
