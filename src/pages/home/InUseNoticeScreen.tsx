// InUseNoticeScreen.tsx
import { useBidStore } from "@app/store/bidStore.ts";
import * as s from "./inUseNoticieScreen.css.ts";
import { Card } from "@shared/components/index.ts";
import { BatteryInfoCard, StationList, type BatteryInfo } from "@entities";
import { app, container, content } from "@shared/css";

export default function InUseNoticeScreen() {
  const IMAGE_URL = "https://i.postimg.cc/rpkz8RHV/OC-Image-1-1536x1025.webp";
  const bid = useBidStore((s) => s.bid);
  // 더미 데이터
  const info: BatteryInfo = {
    model: "OC Portable Battery",
    bid,
    status: "RENTED_BY_OTHER",
    socPercent: 30,
    health: "poor",
    stationName: "City Hall #12",
    imageUrl: IMAGE_URL,
  };

  return (
    <div className={container()}>
      <div className={app}>
        <main className={content}>
          {/* 1) 대여 불가 안내 + 배터리 정보 */}
          <div className={s.banner}>
            <div className={s.iconCircle}>!</div>
            <div>
              <div style={{ fontWeight: 700 }}>지금은 대여할 수 없어요</div>
              <div className={s.meta}>
                다른 사용자가 이 배터리를 사용 중입니다.
              </div>
            </div>
          </div>

          <BatteryInfoCard data={info} />

          <Card title="스테이션 정보">
            <StationList />
          </Card>
        </main>
      </div>
    </div>
  );
}
