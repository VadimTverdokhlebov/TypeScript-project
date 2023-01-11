import User from '../models/users';

export function getUser(email: string) {
  return User.findOne({ email });
}

export function createNewUser(dataUser: any) {
  return User.create(dataUser);
}
