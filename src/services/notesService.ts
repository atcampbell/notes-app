import { INote, Note } from '../models/Note';

export const findAll = async (): Promise<INote[]> => Note.find();

export const find = async (id: string): Promise<INote | null> =>
  Note.findById(id);

export const create = async (newItem: INote): Promise<INote | null> =>
  Note.create(newItem);

export const update = async (
  id: string,
  updatedItem: INote
): Promise<INote | null> => {
  const note = await Note.findByIdAndUpdate(id, updatedItem, { new: true });

  if (!note) {
    return null;
  }

  return note;
};

export const remove = async (id: string): Promise<INote | null> => {
  const note = await await Note.findByIdAndDelete(id);

  if (!note) {
    return null;
  }

  return note;
};
