import { users } from '../users';

export const findUserByCredentials = (username: string, password_DO_NOT_USE_IN_PROD: string) => {
  
  return users.find(
    (user) => user.username === username && user.password === password_DO_NOT_USE_IN_PROD
  );
};