import User from '../models/user.js';
export const generateUserNumber = async () => {
  let number, exists;
  do {
    number = Math.floor(100000 + Math.random() * 900000);
    exists = await User.exists({ userUniqueId: number });
  } while (exists);
  return number;
};
