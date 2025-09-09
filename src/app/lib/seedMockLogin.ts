import liff from "@line/liff";
// 반드시 init 이후
export function seedMockLogin() {
  liff.$mock.set({
    isLoggedIn: true,
    getAccessToken: "mock_access_token_123",
    getIDToken: "mock_id_token_abc",
    getDecodedIDToken: {
      sub: "U_mock_1234",
      name: "Dev User",
      email: "dev@example.com",
    },
    getProfile: {
      userId: "U_mock_1234",
      displayName: "Dev User",
      pictureUrl: "https://picsum.photos/200",
      statusMessage: "local mock",
    },
  });
}
