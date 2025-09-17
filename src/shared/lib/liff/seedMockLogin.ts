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
    getFriendship: { friendFlag: true },
    getProfile: {
      userId: "U_mock_1234",
      displayName: "Dev User",
      pictureUrl: "https://picsum.photos/200",
      statusMessage: "local mock",
    },
    getContext: {
      type: "external",
      viewType: "full",
      endpointUrl: "https://seulah-lim.github.io/liff-demo/",
      groupId: "",
      availability: {
        shareTargetPicker: {
          permission: false,
          minVer: "",
          unsupportedFromVer: undefined,
        },
        multipleLiffTransition: {
          permission: false,
          minVer: "",
          unsupportedFromVer: undefined,
        },
        subwindowOpen: {
          permission: false,
          minVer: "",
          unsupportedFromVer: undefined,
        },
        scanCode: {
          permission: false,
          minVer: "",
          unsupportedFromVer: undefined,
        },
        scanCodeV2: {
          permission: false,
          minVer: "",
          minOsVer: "",
        },
        getAdvertisingId: {
          permission: false,
          minVer: "",
          unsupportedFromVer: undefined,
        },
        addToHomeScreen: {
          permission: false,
          minVer: "",
          unsupportedFromVer: undefined,
        },
        bluetoothLeFunction: {
          permission: false,
          minVer: "",
          unsupportedFromVer: undefined,
        },
        skipChannelVerificationScreen: {
          permission: false,
          minVer: "",
        },
        addToHomeV2: {
          permission: false,
          minVer: "",
        },
        addToHomeHideDomain: {
          permission: false,
          minVer: "",
        },
        addToHomeLineScheme: {
          permission: false,
          minVer: "",
        },
        iap: {
          permission: false,
          minVer: "",
        },
      },
      scope: [],
    },
  });
}
