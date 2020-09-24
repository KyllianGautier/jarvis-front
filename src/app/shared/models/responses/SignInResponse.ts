import User from '../entities/User';

export default interface SignInResponse {
  token: string;
  user: User;
}
