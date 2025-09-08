import type { Profile } from "@liff/get-profile";

export type LiffState = {
  ready: boolean;
  isLoggedIn: boolean;
  profile: Profile | null;
  idToken: string | null;
  decodedIdToken: LiffJWTPayload | null;
  grantedScopes: string[];
  scopes: ("profile" | "chat_message.write" | "openid" | "email")[];
  error?: string;
  debugLogs: string[];
};

export type LiffActions = {
  init: () => Promise<void>;
  login: () => void;
  logout: () => void;
  refreshProfile: () => Promise<void>;
  appendLog: (msg: string) => void;
};

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

export type LiffErrorLike =
  | { code?: string; message?: string; cause?: unknown }
  | unknown;
