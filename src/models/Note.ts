import mongoose, { Document } from 'mongoose';

export interface INote extends Document {
  title: string;
  content: string;
}

const noteSchema = new mongoose.Schema<INote>(
  {
    title: {
      type: String,
      unique: true,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Note = mongoose.model<INote>('Note', noteSchema);
