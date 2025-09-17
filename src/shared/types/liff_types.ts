export type LiffJWTPayload = {
  sub: string;
  name?: string;
  picture?: string;
  email?: string;
  iss?: string;
  aud?: string;
  exp?: number;
  iat?: number;
};
