import express from 'express';
import cors from 'cors';
import productsRouter from './routes/productsRouter';
import connectToDataBase from './db/connectToDataBase';
import searchRouter from './routes/searchRouter';
import orderRouter from './routes/orderRouter';
import authRouter from './routes/authRouter';
import config from './config';

async function startServer() {
  const corsOptions = {
    origin: 'http://localhost:8080',
    credentials: true,
    optionSuccessStatus: 200,
  };

  const app = express();

  app.use(cors(corsOptions));
  app.use(express.json());
  app.use(express.static('public'));

  app.use('/api', orderRouter);
  app.use('/api', productsRouter);
  app.use('/api', searchRouter);
  app.use('/api/auth', authRouter);

  const PORT: string | undefined = config.port;

  app.listen(PORT, () => {
    console.log(`Server listens http://localhost:${PORT}`);
  });
}

connectToDataBase()
  .then(() => startServer());
