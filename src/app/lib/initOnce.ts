import liff from "@line/liff";

type InitOpts = {
  liffId: string;
  enableMock: boolean;
};

export function initOnce({ liffId, enableMock }: InitOpts) {
  return new Promise<void>((resolve, reject) => {
    try {
      liff.init(
        {
          liffId,
          withLoginOnExternalBrowser: false,
          mock: enableMock, // 모듈 보강된 타입 전제
        },
        () => resolve(),
        (err) => reject(err)
      );
    } catch (e) {
      reject(e);
    }
  });
}
