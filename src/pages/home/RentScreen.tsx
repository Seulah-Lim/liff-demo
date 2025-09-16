import { useMemo, useRef, useState } from "react";
import { useBidStore } from "@app/store/bidStore.ts";
import * as s from "./rentScreen.css.ts";
import { RentButton } from "@pages/home/RentButton.tsx";

import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { showError } from "@shared/lib/toast/notify.ts";
import { createSearchParams, useNavigate } from "react-router";
import { BottomSheet } from "@shared/ui/bottomsheet/BottomSheet.tsx";

type Preset = "30" | "60" | "120" | "custom";

function formatDuration(m: number) {
  const h = Math.floor(m / 60);
  const mm = m % 60;
  if (h && mm) return `${h}시간 ${mm}분`;
  if (h) return `${h}시간`;
  return `${mm}분`;
}

function formatAbs(ts: number) {
  const d = new Date(ts);
  const now = new Date();
  const tomorrow = new Date(now.getTime() + 86400000);
  const isToday = d.toDateString() === now.toDateString();
  const isTomorrow = d.toDateString() === tomorrow.toDateString();
  const day = isToday
    ? "오늘"
    : isTomorrow
    ? "내일"
    : `${d.getMonth() + 1}/${d.getDate()}`;
  const hh = String(d.getHours()).padStart(2, "0");
  const mm = String(d.getMinutes()).padStart(2, "0");
  return `${day} ${hh}:${mm}`;
}

async function fakeRentApi(minutes: number) {
  return new Promise<{ rentalId: string }>((resolve, reject) => {
    setTimeout(() => {
      if (minutes === 30) {
        reject(new Error("임시 오류 발생"));
      } else {
        resolve({ rentalId: "demo-rental-1234" });
      }
    }, 2000);
  });
}
export default function RentScreen() {
  const IMAGE_URL =
    "https://www.okamura.com/wp-content/uploads/2025/04/OC_Image_1.webp";
  const bid = useBidStore((s) => s.bid);
  const navigate = useNavigate();

  // 시간 선택
  const [sel, setSel] = useState<Preset>("30");
  const [customMin, setCustomMin] = useState<number>(90);
  const MIN = 10;
  const MAX = 12 * 60;
  const STEP = 10;

  const minutes = useMemo(() => {
    if (sel === "30") return 30;
    if (sel === "60") return 60;
    if (sel === "120") return 120;
    return customMin;
  }, [sel, customMin]);

  const hours = Math.floor(customMin / 60);
  const mins = customMin % 60;
  useMemo(() => {
    if (hours === 12) return [0];
    const base = [0, 10, 20, 30, 40, 50];
    return hours === 0 ? base.slice(1) : base;
  }, [hours]);

  const clampToStep = (val: number) =>
    Math.min(MAX, Math.max(MIN, Math.round(val / STEP) * STEP));
  const onHours = (h: number) => {
    let m = mins;
    if (h === 12) m = 0;
    if (h === 0 && m === 0) m = 10;
    setCustomMin(clampToStep(h * 60 + m));
  };
  const onMins = (m: number) => {
    let h = hours;
    if (h === 12) h = 11;
    setCustomMin(clampToStep(h * 60 + m));
  };

  // 바텀시트
  const [open, setOpen] = useState(false);
  const NOW_TS = useRef<number>(Date.now()).current;

  const estimatedDue = NOW_TS + minutes * 60_000; // 고정 now + 선택한 이용 시간

  // const onRentSuccess = () => {
  //   // 여기서 상태 갱신/무효화 → 라우팅
  //   // 예: queryClient.invalidateQueries({ queryKey: ["rental", bid] });
  //   navigate("/home/inuse", { replace: true });
  // };

  // const onRentError = () => {
  //   setSubmitting(false);
  //   setOpen(false);
  // };

  const rent = useMutation({ mutationFn: fakeRentApi });

  const onRent = async () => {
    try {
      await rent.mutateAsync(minutes);

      navigate(
        { search: createSearchParams({ view: "return" }).toString() },
        { replace: true } //TODO 뒤로가기 막기
      );
      toast.success("대여 완료! 이용을 시작할 수 있어요.");
    } catch {
      toast.dismiss();
      showError("⚠️ 대여를 시작할 수 없어요. 다시 시도해주세요.");
    }
  };

  return (
    <div className={s.container}>
      <div className={s.app}>
        <main className={s.content}>
          <section className={s.card}>
            <img
              src={IMAGE_URL}
              alt="Battery preview"
              className={s.imageCover}
            />

            <div className={s.sep} />
            <div className={s.kv}>
              <div className={s.k}>모델</div>
              <div>OC Portable Battery</div>

              <div className={s.k}>배터리ID</div>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <span>{bid ?? "-"}</span>
                <span className={`${s.pill} ${s.pillGreen}`}>
                  <span className={s.dot} /> Available
                </span>
              </div>

              <div className={s.k}>스테이션</div>
              <div>City Hall #12</div>
            </div>
          </section>

          {/* 시간 선택 */}
          <section className={s.card}>
            <h3>시간 선택</h3>
            <div className={s.chips}>
              {[
                { id: "t30", label: "30분", value: "30" },
                { id: "t60", label: "1시간", value: "60" },
                { id: "t120", label: "2시간", value: "120" },
                {
                  id: "tCustom",
                  label: "맞춤",
                  value: "custom",
                },
              ].map((opt) => (
                <div key={opt.id} className={s.chip}>
                  <input
                    className={s.chipInput}
                    type="radio"
                    name="t"
                    id={opt.id}
                    checked={sel === (opt.value as Preset)}
                    onChange={() => setSel(opt.value as Preset)}
                    aria-controls={
                      opt.value === "custom" ? "custom-picker" : undefined
                    }
                    aria-expanded={
                      opt.value === "custom" ? sel === "custom" : undefined
                    }
                  />
                  <label className={s.chipLabel} htmlFor={opt.id}>
                    {opt.label}
                  </label>
                </div>
              ))}
            </div>

            {/* 맞춤 인라인 피커 */}
            <div
              id="custom-picker"
              className={`${s.customArea} ${
                sel === "custom" ? s.customAreaOpen : ""
              }`}
              aria-hidden={sel !== "custom"}
            >
              <div className={s.customRow}>
                <label className={s.customLabel} htmlFor="hours">
                  시간
                </label>
                <div className={s.selectWrap}>
                  <select
                    id="hours"
                    className={s.select}
                    value={hours}
                    onChange={(e) => onHours(Number(e.target.value))}
                  >
                    {Array.from({ length: 13 }).map((_, i) => (
                      <option key={i} value={i} disabled={i === 12 && mins > 0}>
                        {i}시간
                      </option>
                    ))}
                  </select>
                </div>

                <label className={s.customLabel} htmlFor="mins">
                  분
                </label>
                <div className={s.selectWrap}>
                  <select
                    id="mins"
                    className={s.select}
                    value={mins}
                    onChange={(e) => onMins(Number(e.target.value))}
                  >
                    {[0, 10, 20, 30, 40, 50]
                      .filter((m) => (hours === 0 ? m >= 10 : true))
                      .filter((m) => (hours === 12 ? m === 0 : true))
                      .map((m) => (
                        <option key={m} value={m}>
                          {m}분
                        </option>
                      ))}
                  </select>
                </div>
              </div>
            </div>

            <div className={s.summaryRow} aria-live="polite">
              <span className={s.small}>이용 시간</span>
              <span className={s.summaryValue}>
                총 {formatDuration(minutes)} 이용
              </span>
            </div>

            <div className={s.sep} />
            <label className={s.termsRow}>
              <input type="checkbox" defaultChecked />
              <span className={s.small}>약관에 동의합니다</span>
            </label>
          </section>
          <div className={s.fabSticky}>
            <RentButton
              disabled={rent.isPending}
              onClick={() => {
                setOpen(true);
              }}
            />
          </div>
        </main>
      </div>

      <BottomSheet
        open={open}
        title="이용을 시작할까요?"
        onClose={() => setOpen(false)}
        cancelLabel="취소"
        confirmLabel="대여 시작하기"
        onConfirm={onRent}
      >
        <div className={s.sheetRow}>
          <div className={s.sheetKey}>반납 예정</div>
          <div className={s.sheetVal}>{formatAbs(estimatedDue)}</div>
        </div>

        <div className={s.sheetNotes}>
          <div className={s.sheetNote}>반납 전에 언제든 연장할 수 있어요.</div>
          <div className={s.sheetNote}>
            반납 방법은 프로필 &gt; 반납 안내에서 확인할 수 있어요
          </div>
        </div>
      </BottomSheet>
    </div>
  );
}
