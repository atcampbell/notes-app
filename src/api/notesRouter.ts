import express, { Request, Response } from 'express';
import { INote } from '../models/Note';
import * as NotesService from '../services/notesService';

export const notesRouter = express.Router();

notesRouter.get('/', async (req: Request, res: Response) => {
  try {
    const notes: INote[] = await NotesService.findAll();
    res.status(200).send(notes);
  } catch (e) {
    res.status(500).send(e.message);
  }
});

notesRouter.get('/:id', async (req: Request, res: Response) => {
  try {
    const note: INote | null = await NotesService.find(req.params.id);

    if (!note) {
      return res.status(404).send(`No note found with id ${req.params.id}`);
    }

    res.status(200).send(note);
  } catch (e) {
    res.status(500).send(e.message);
  }
});

notesRouter.post('/', async (req: Request, res: Response) => {
  try {
    const note: INote = req.body;

    const newNote = await NotesService.create(note);

    res.status(201).send(newNote);
  } catch (e) {
    res.status(500).send(e.message);
  }
});

notesRouter.put('/:id', async (req: Request, res: Response) => {
  try {
    const note: INote = req.body;

    const newNote = await NotesService.update(req.params.id, note);

    if (!newNote) {
      return res.status(404).send(`No note found with id ${req.params.id}`);
    }

    res.status(200).send(newNote);
  } catch (e) {
    res.status(500).send(e.message);
  }
});

notesRouter.delete('/:id', async (req: Request, res: Response) => {
  try {
    const note = await NotesService.remove(req.params.id);

    if (!note) {
      return res.status(404).send(`No note found with id ${req.params.id}`);
    }

    res.status(200).send(note);
  } catch (e) {
    res.status(500).send(e.message);
  }
});
