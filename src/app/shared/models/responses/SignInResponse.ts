import User from '../entities/User';

export default interface SignInResponse {
  token: string;
  refreshToken: string;
  isAdmin: boolean;
  user: User;
}
