import { Card } from "@shared/ui";
import * as s from "./batteryInfoCard.css";

export type BatteryHealth = "good" | "warn" | "poor";
export type BatteryStatus = "AVAILABLE" | "RENTED_BY_ME" | "RENTED_BY_OTHER";

//배터리 상태는 이용가능(available), 사용중, 타인 사용중

export interface BatteryInfo {
  model: string;
  bid: string | null;
  status: BatteryStatus;
  socPercent: number;
  health?: BatteryHealth;
  stationName: string;
  imageUrl?: string;
}

type Props = {
  data: BatteryInfo;
};

const BatteryStatusTintRgb: Record<BatteryStatus, string> = {
  AVAILABLE: "16,185,129", // 초록
  RENTED_BY_OTHER: "239,68,68", // 빨강
  RENTED_BY_ME: "99,102,241", // 인디고/보라
};

export function BatteryInfoCard({ data }: Props) {
  const { model, bid, status, socPercent, health, stationName, imageUrl } =
    data;
  const tintRgb = BatteryStatusTintRgb[data.status];

  return (
    <Card tintRgb={tintRgb}>
      {imageUrl && (
        <img src={imageUrl} alt="Battery preview" className={s.imageCover} />
      )}

      <div className={s.kv}>
        <div className={s.k}>모델명</div>
        <div>{model}</div>

        <div className={s.k}>배터리 ID</div>
        <div className={s.row}>
          <span>{bid ?? "-"}</span>
          <span
            className={`${s.pill} ${
              status === "AVAILABLE" ? s.pillGreen : s.pillPurple
            }`}
          >
            <span className={s.dot} />{" "}
            {status === "AVAILABLE" ? "Available" : "In use"}
          </span>
        </div>

        <div className={s.k}>잔여 배터리</div>
        <div className={s.batteryValue}>
          {socPercent}%
          {health && (
            <span
              className={`${s.metaHint} ${
                health === "good"
                  ? s.healthGood
                  : health === "warn"
                  ? s.healthWarn
                  : s.healthPoor
              }`}
              aria-label={`성능: ${
                health === "good"
                  ? "우수"
                  : health === "warn"
                  ? "주의"
                  : "교체 권장"
              }`}
            >
              ·{"성능 "}
              {health === "good" ? "우수" : health === "warn" ? "보통" : "나쁨"}
            </span>
          )}
        </div>

        <div className={s.k}>스테이션</div>
        <div>{stationName}</div>
      </div>
    </Card>
  );
}
