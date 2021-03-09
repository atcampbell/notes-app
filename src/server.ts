import app from './app';

const PORT: number = parseInt(process.env.PORT as string, 10);

const server = app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

export default server;
