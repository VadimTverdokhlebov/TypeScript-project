import mongoose from 'mongoose';
import config from '../config';

export default async function connectToDataBase() {
  const db: string = config.databaseURL;

  const optionsDataBase = {
    authSource: 'admin',
    user: config.databaseUser,
    pass: config.databasePassword,
  };

  mongoose.set('strictQuery', true);

  mongoose
    .connect(db, optionsDataBase)
    .then(() => {
      console.log('Connected to db');
    })
    .catch((error) => console.log(error));

  // Создание пользователя

  // db.createUser(
  //   {
  //   user: "Vadim",
  //   pwd:  "121212",
  //   roles:[{role: "userAdmin" , db:"Fast_food"}]})
}
