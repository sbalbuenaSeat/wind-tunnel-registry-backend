import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Schema as MongooseSchema, Types } from 'mongoose';

export type EntryDocument = HydratedDocument<Entry>;

export enum FlightType {
  INDIVIDUAL = 'INDIVIDUAL',
  SHARED = 'SHARED',
}

@Schema({ timestamps: true })
export class Entry {
  @Prop({ type: String, required: true, enum: FlightType })
  type: FlightType;

  @Prop({ type: String, required: true })
  date: string;

  @Prop({ type: Number, required: true, min: 1, max: 24 * 60 })
  minutes: number;

  @Prop({ type: String })
  note?: string;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User', required: true })
  user: Types.ObjectId;
}

export const EntrySchema = SchemaFactory.createForClass(Entry);

EntrySchema.index({ date: 1, type: 1 });
