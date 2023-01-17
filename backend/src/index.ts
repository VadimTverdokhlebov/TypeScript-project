import express from 'express';
import cors from 'cors';
import connectToDataBase from './db/connectToDataBase';
import config from './config';
import indexRouter from './routes/indexRouter';
import errorsMiddleware from './middleware/errorsMiddleware';

async function startServer() {
  const corsOptions = {
    origin: config.origin,
    credentials: true,
    optionSuccessStatus: 200,
  };

  const app = express();

  app.use(cors(corsOptions));
  app.use(express.json());
  app.use(express.static('public'));
  app.use('/api', indexRouter());
  app.use(errorsMiddleware);

  const PORT = config.port;

  app.listen(PORT, () => {
    console.log(`Server listens http://localhost:${PORT}`);
  });
}

connectToDataBase()
  .then(() => startServer());
