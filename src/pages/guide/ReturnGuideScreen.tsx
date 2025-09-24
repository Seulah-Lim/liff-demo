import { useMemo } from "react";
import * as s from "./returnGuideScreen.css";
import type { Station } from "@pages/home/ReturnExtendScreen";

export default function ReturnGuideScreen() {
  const IMAGE_URL =
    "https://www.okamura.com/wp-content/uploads/2025/04/OC_Product-Page_Design_2-1536x1010.webp";
  const nearbyStations: Station[] = useMemo(
    () => [
      {
        id: "mtx-01",
        name: "Motrex #1",
        distance: "도보 6분",
        freeSlots: 1,
        totalSlots: 4,
      },
      {
        id: "ch-12",
        name: "City Hall #12",
        distance: "도보 2분",
        freeSlots: 2,
        totalSlots: 4,
      },
      {
        id: "lib-03",
        name: "Central Library #3",
        distance: "450m",
        freeSlots: 3,
        totalSlots: 4,
      },
      {
        id: "plz-07",
        name: "Main Plaza #7",
        distance: "도보 6분",
        freeSlots: 4,
        totalSlots: 4,
      },
    ],
    []
  );

  const store = {
    id: "st_001",
    name: "강남역 2번 출구 스테이션",
    phone: "02-1234-5678",
    hours: "매일 09:00 ~ 22:00",
    website: "https://www.okamura.com/products/oc/",
    websiteLabel: "OC Portable Battery 바로가기",
    address: "서울특별시 강남구 테헤란로 123, 1층",
    note: "점심시간(12:00~13:00)에는 문의 전화 연결이 지연될 수 있습니다.",
  };

  return (
    <div className={s.container}>
      <div className={s.app}>
        <main className={s.content}>
          <section className={s.card}>
            <h3 className={s.cardTitle}>반납 방법 안내</h3>

            <ol
              className={s.list}
              style={{ listStyle: "decimal", paddingLeft: 18 }}
            >
              <li>트레이에 배터리를 끝까지 꽂아주세요.</li>
              <li>표시등이 켜지면 반납이 완료됩니다.</li>
              <li>문제 발생 시 고객지원으로 문의해주세요.</li>
            </ol>
            <div className={s.hint}>
              ※ 반납 후에는 앱 화면에서 ‘반납 완료’ 상태를 확인하세요.
            </div>
          </section>
          <section className={s.card}>
            <h3 className={s.cardTitle}>반납 위치 안내</h3>
            <div className={s.hint} style={{ marginBottom: 4 }}>
              지점 내 스테이션들 위치
            </div>

            <div
              className={s.map}
              style={{ backgroundImage: `url(${IMAGE_URL})` }}
            />
            <div className={s.sep}></div>
            <div className={s.kv}>
              <div className={s.k}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="12"
                  height="12"
                  style={{ marginRight: 4 }}
                  fill="currentColor"
                  viewBox="0 0 16 16"
                >
                  <path d="M8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71z" />
                  <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16m7-8A7 7 0 1 1 1 8a7 7 0 0 1 14 0" />
                </svg>
                이용 가능 시간
              </div>
              <div>{store.hours ?? "-"}</div>
              <div className={s.k}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="12"
                  height="12"
                  fill="currentColor"
                  viewBox="0 0 16 16"
                  style={{ marginRight: 4 }}
                >
                  <path d="M3.654 1.328a.678.678 0 0 0-1.015-.063L1.605 2.3c-.483.484-.661 1.169-.45 1.77a17.6 17.6 0 0 0 4.168 6.608 17.6 17.6 0 0 0 6.608 4.168c.601.211 1.286.033 1.77-.45l1.034-1.034a.678.678 0 0 0-.063-1.015l-2.307-1.794a.68.68 0 0 0-.58-.122l-2.19.547a1.75 1.75 0 0 1-1.657-.459L5.482 8.062a1.75 1.75 0 0 1-.46-1.657l.548-2.19a.68.68 0 0 0-.122-.58zM1.884.511a1.745 1.745 0 0 1 2.612.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.68.68 0 0 0 .178.643l2.457 2.457a.68.68 0 0 0 .644.178l2.189-.547a1.75 1.75 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.6 18.6 0 0 1-7.01-4.42 18.6 18.6 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877z" />
                </svg>
                문의 전화
              </div>
              <div>
                {store.phone ? (
                  <a href={`tel:${store.phone}`}>{store.phone}</a>
                ) : (
                  "-"
                )}
              </div>
              <div className={s.k}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="12"
                  height="12"
                  style={{ marginRight: 4 }}
                  fill="currentColor"
                  viewBox="0 0 16 16"
                >
                  <path d="M6.354 5.5H4a3 3 0 0 0 0 6h3a3 3 0 0 0 2.83-4H9q-.13 0-.25.031A2 2 0 0 1 7 10.5H4a2 2 0 1 1 0-4h1.535c.218-.376.495-.714.82-1z" />
                  <path d="M9 5.5a3 3 0 0 0-2.83 4h1.098A2 2 0 0 1 9 6.5h3a2 2 0 1 1 0 4h-1.535a4 4 0 0 1-.82 1H12a3 3 0 1 0 0-6z" />
                </svg>
                웹사이트
              </div>
              <div>
                {store.website ? (
                  <a
                    href={store.website}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {store.websiteLabel ?? store.website}
                  </a>
                ) : (
                  "-"
                )}
              </div>
            </div>
          </section>
          <section className={s.card}>
            <h3 className={s.cardTitle}>가까운 반납 스테이션</h3>

            <div className={s.hint} style={{ marginBottom: 4 }}>
              스테이션의 잔여 슬롯 정보를 제공
            </div>
            <ul className={s.stationListMinimal} role="list">
              {nearbyStations.map((st) => {
                const freeSlots = st.freeSlots;
                const status =
                  freeSlots === 4
                    ? "없음"
                    : freeSlots === 3
                    ? "혼잡"
                    : freeSlots === 2
                    ? "보통"
                    : "여유";
                return (
                  <li key={st.id} className={s.stationRow}>
                    <div className={s.stationMain}>
                      <div className={s.stationName}>{st.name}</div>
                      <div className={s.stationSub}>
                        남은 자리 {st.freeSlots} / 전체 {st.totalSlots}
                      </div>
                    </div>
                    <div className={s.stationAside}>
                      <span
                        className={`${s.slotPill} ${s[`status_${status}`]}`}
                        aria-label={`남은 자리 ${st.freeSlots}개 / 전체 ${st.totalSlots}개 (${status})`}
                      >
                        {status}
                      </span>
                    </div>
                  </li>
                );
              })}
            </ul>
          </section>
        </main>
      </div>
    </div>
  );
}
