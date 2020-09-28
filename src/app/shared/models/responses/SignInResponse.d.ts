interface SignInResponse {
  token: string;
  refreshToken: string;
  isAdmin: boolean;
  user: User;
}
