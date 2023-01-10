import User from '../models/users';

export function getUser(email: string) {
  return User.findOne({ email });
}

export async function createNewUser(dataUser: any) {
  const user = new User(dataUser);

  await user.save();
}
