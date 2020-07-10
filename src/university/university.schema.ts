import { Document } from 'mongoose';
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class University extends Document {
  @Prop()
  address: string;
}

export const UniversitySchema = SchemaFactory.createForClass(University);
