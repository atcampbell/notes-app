import * as dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import mongoose from 'mongoose';
import { notesRouter } from './api/notesRouter';
import { errorHandler } from './middleware/errorHandler';
import { notFoundHandler } from './middleware/notFoundHandler';

dotenv.config();

if (!process.env.PORT || !process.env.DB_HOST) {
  process.exit(1);
}

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());

app.use('/api/notes', notesRouter);

app.use(errorHandler);
app.use(notFoundHandler);

console.log(process.env.NODE_ENV);

if (process.env.NODE_ENV !== 'test') {
  try {
    mongoose.connect(process.env.DB_HOST, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });
  } catch (e) {
    console.log('Error connecting to database');
    process.exit(1);
  }
}

// app.listen(PORT, () => {
//   console.log(`Listening on port ${PORT}`);
// });

export default app;
