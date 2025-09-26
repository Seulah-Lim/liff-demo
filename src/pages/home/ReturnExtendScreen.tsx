import { useMemo, useState } from "react";
import { useBidStore } from "@app/store/bidStore";
import * as s from "./returnExtendScreen.css";
import { BottomSheet, Button, Card } from "@shared/components";
import { BatteryInfoCard, StationList, type BatteryInfo } from "@entities";
import { app, container, content } from "@shared/css";

export type Station = {
  id: string;
  name: string;
  distance: string; // 예: "도보 2분" / "350m"
  freeSlots: number; // 빈 슬롯 수
  totalSlots: number; // 전체 슬롯
};

export default function ReturnExtendScreen() {
  const IMAGE_URL = "https://i.postimg.cc/rpkz8RHV/OC-Image-1-1536x1025.webp";
  const bid = useBidStore((s) => s.bid);
  const [open, setOpen] = useState(false);

  // 더미 데이터
  const info: BatteryInfo = {
    model: "OC Portable Battery",
    bid,
    status: "RENTED_BY_ME",
    socPercent: 75,
    health: "warn",
    stationName: "City Hall #12",
    imageUrl: IMAGE_URL,
  };

  const expiresAtISO = "2025-09-02T18:30:00+09:00";
  const expiresAt = useMemo(() => new Date(expiresAtISO), []);
  const fmt = (d: Date) =>
    `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(
      d.getDate()
    ).padStart(2, "0")} ${String(d.getHours()).padStart(2, "0")}:${String(
      d.getMinutes()
    ).padStart(2, "0")}`;

  return (
    <div className={container({ cta: true })}>
      <div className={app}>
        <main className={content}>
          <BatteryInfoCard data={info} />
          <Card title="반납 시간">
            <div className={s.rowBetween}>
              <span className={s.meta}>만료 예정</span>
              <strong className={s.datetime}>{fmt(expiresAt)}</strong>
            </div>
          </Card>

          <Card title="스테이션 정보">
            <StationList />
          </Card>
          <div className={s.fabSticky}>
            <div className={s.twoButtonsGrid}>
              <Button variant="primary" onClick={() => setOpen(true)}>
                반납하기
              </Button>
              <Button variant="secondary">연장하기</Button>
            </div>
          </div>
        </main>
      </div>
      <BottomSheet
        open={open}
        title="지금 반납할까요?"
        onClose={() => setOpen(false)}
        cancelLabel="취소"
        confirmLabel="반납하기"
        onConfirm={() => {}}
      >
        <div className={s.sheetRow}>
          <div className={s.sheetKey}>반납 기한</div>
          <div className={s.sheetVal}>오늘 18:30</div>
        </div>

        <div className={s.sheetNotes}>
          <div className={s.sheetNote}>스테이션에 배터리를 꽂아주세요.</div>
          <div className={s.sheetNote}>지시등이 점등되었는지 확인해주세요.</div>
          <div className={s.sheetNote}>
            연장이 필요하면 반납 전에 ‘연장하기’를 이용하세요.
          </div>
        </div>
      </BottomSheet>
    </div>
  );
}
