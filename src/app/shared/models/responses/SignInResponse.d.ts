interface SignInResponse {
  token: string;
  refreshToken: string;
  admin: boolean;
  user: User;
}
