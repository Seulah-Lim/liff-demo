import { useEffect, useRef, useState } from "react";
import { Button, Card, Modal } from "@shared/components";
import * as s from "./supportScreen.css";
import { app, container, content } from "@shared/css";
import liff from "@line/liff";
import { useModalByQuery } from "@shared/hooks/useModalByQuery";

type QuickKey = "rent" | "return" | "loss" | "org";

export default function SupportScreen() {
  const [desc, setDesc] = useState("");
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const { isOpen, open, close } = useModalByQuery("chat");

  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  const MAX_MB = 10;
  const acceptImage = (f: File) =>
    f.type.startsWith("image/") && f.size <= MAX_MB * 1024 * 1024;

  // 파일 입력: 버튼으로만 트리거
  const fileInputRefPick = useRef<HTMLInputElement>(null); // 앨범/파일
  const fileInputRefCamera = useRef<HTMLInputElement>(null); // 즉시 촬영
  const onPickClick = (e: React.MouseEvent) => {
    e.preventDefault();
    fileInputRefPick.current?.click();
  };

  function setFileAndPreview(f: File) {
    if (!acceptImage(f)) return; // TODO: 토스트 안내
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setPreviewUrl(URL.createObjectURL(f));
  }
  const onPickFile: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const f = e.target.files?.[0];
    if (f) setFileAndPreview(f);
  };
  const clearFile = () => {
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setPreviewUrl(null);
  };

  const openChat = () => {
    const url = `https://line.me/R/ti/p/${import.meta.env.VITE_BOT_ID}`;
    liff.openWindow({ url, external: false });
  };
  const callCenter = () => (window.location.href = "tel:0212345678");
  const submitTicket = () => {
    // TODO: desc + 선택된 파일로 FormData 전송
  };
  const onQuick = (key: QuickKey) => {
    console.log("key:", key);
  };

  return (
    <div className={container()}>
      <div className={app}>
        <main className={content}>
          <header className={s.pageHeader}>
            <h1 className={s.title}>무엇을 도와드릴까요?</h1>
            <p className={s.subtitle}>
              빠른 해결 가이드를 먼저 확인하거나, 상담으로 바로 연결하세요.
            </p>
          </header>

          <Card className={s.sectionCard}>
            <div className={s.sectionHeader}>
              <span className={s.sectionKicker}>해결 가이드</span>
            </div>

            <div className={s.quickCardGrid}>
              <button className={s.quickCard} onClick={() => onQuick("rent")}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  className={s.quickSvg}
                  viewBox="0 0 16 16"
                >
                  <path d="M0 .5A.5.5 0 0 1 .5 0h3a.5.5 0 0 1 0 1H1v2.5a.5.5 0 0 1-1 0zm12 0a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 .5.5v3a.5.5 0 0 1-1 0V1h-2.5a.5.5 0 0 1-.5-.5M.5 12a.5.5 0 0 1 .5.5V15h2.5a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5v-3a.5.5 0 0 1 .5-.5m15 0a.5.5 0 0 1 .5.5v3a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1 0-1H15v-2.5a.5.5 0 0 1 .5-.5M4 4h1v1H4z" />
                  <path d="M7 2H2v5h5zM3 3h3v3H3zm2 8H4v1h1z" />
                  <path d="M7 9H2v5h5zm-4 1h3v3H3zm8-6h1v1h-1z" />
                  <path d="M9 2h5v5H9zm1 1v3h3V3zM8 8v2h1v1H8v1h2v-2h1v2h1v-1h2v-1h-3V8zm2 2H9V9h1zm4 2h-1v1h-2v1h3zm-4 2v-1H8v1z" />
                  <path d="M12 9h2V8h-2z" />
                </svg>
                <span className={s.quickTextCol}>
                  <span className={s.quickTitle}>대여가 안돼요</span>
                  <span className={s.quickDesc}>QR/권한/기기 연결 가이드</span>
                </span>
              </button>

              <button className={s.quickCard} onClick={() => onQuick("return")}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  className={s.quickSvg}
                  viewBox="0 0 16 16"
                >
                  <path d="M15.964.686a.5.5 0 0 0-.65-.65L.767 5.855a.75.75 0 0 0-.124 1.329l4.995 3.178 1.531 2.406a.5.5 0 0 0 .844-.536L6.637 10.07l7.494-7.494-1.895 4.738a.5.5 0 1 0 .928.372zm-2.54 1.183L5.93 9.363 1.591 6.602z" />
                  <path d="M14.975 10.025a3.5 3.5 0 1 0-4.95 4.95 3.5 3.5 0 0 0 4.95-4.95m-4.243.707a2.5 2.5 0 0 1 3.147-.318l-3.465 3.465a2.5 2.5 0 0 1 -.318-3.147m.39 3.854 3.464-3.465a2.501 2.501 0 0 1-3.465 3.465Z" />
                </svg>
                <span className={s.quickTextCol}>
                  <span className={s.quickTitle}>반납이 안돼요</span>
                  <span className={s.quickDesc}>반납 절차 · 오류 해결</span>
                </span>
              </button>

              <button className={s.quickCard} onClick={() => onQuick("loss")}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  className={s.quickSvg}
                  viewBox="0 0 16 16"
                >
                  <path d="M1 0 0 1l2.2 3.081a1 1 0 0 0 .815.419h.07a1 1 0 0 1 .708.293l2.675 2.675-2.617 2.654A3.003 3.003 0 0 0 0 13a3 3 0 1 0 5.878-.851l2.654-2.617.968.968-.305.914a1 1 0 0 0 .242 1.023l3.27 3.27a.997.997 0 0 0 1.414 0l1.586-1.586a.997.997 0 0 0 0-1.414l-3.27-3.27a1 1 0 0 0-1.023-.242L10.5 9.5l-.96-.96 2.68-2.643A3.005 3.005 0 0 0 16 3q0-.405-.102-.777l-2.14 2.141L12 4l-.364-1.757L13.777.102a3 3 0 0 0-3.675 3.68L7.462 6.46 4.793 3.793a1 1 0 0 1-.293-.707v-.071a1 1 0 0 0-.419-.814zm9.646 10.646a.5.5 0 0 1 .708 0l2.914 2.915a.5.5 0 0 1-.707.707l-2.915-2.914a.5.5 0 0 1 0-.708M3 11l.471.242.529.026.287.445.445.287.026.529L5 13l-.242.471-.026.529-.445.287-.287.445-.529.026L3 15l-.471-.242L2 14.732l-.287-.445L1.268 14l-.026-.529L1 13l.242-.471.026-.529.445-.287.287-.445.529-.026z" />
                </svg>
                <span className={s.quickTextCol}>
                  <span className={s.quickTitle}>분실/파손</span>
                  <span className={s.quickDesc}>신고 후 처리 흐름 안내</span>
                </span>
              </button>

              <button className={s.quickCard} onClick={() => onQuick("org")}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  className={s.quickSvg}
                  viewBox="0 0 16 16"
                >
                  <path d="M5 8a2 2 0 1 0 0-4 2 2 0 0 0 0 4m4-2.5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1h-4a.5.5 0 0 1-.5-.5M9 8a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1h-4A.5.5 0 0 1 9 8m1 2.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5" />
                  <path d="M2 2a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2zM1 4a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H8.96q.04-.245.04-.5C9 10.567 7.21 9 5 9c-2.086 0-3.8 1.398-3.984 3.181A1 1 0 0 1 1 12z" />
                </svg>
                <span className={s.quickTextCol}>
                  <span className={s.quickTitle}>조직 변경</span>
                  <span className={s.quickDesc}>부서 이동, 권한 재배정</span>
                </span>
              </button>
            </div>
          </Card>

          <Card className={s.sectionCard}>
            <div className={s.sectionHeader}>
              <span className={s.sectionKicker}>상담 연결</span>
              <span className={s.sectionNote}>평일 09:00-18:00</span>
            </div>
            <div className={s.supportRow}>
              <div className={s.supportItem}>
                <div className={s.supportTitle}>실시간 상담(채팅)</div>
                <div className={s.supportDesc}>
                  LINE 공식 계정으로 이어집니다.
                </div>
              </div>
              <Button onClick={open} variant="primary">
                채팅 열기
              </Button>
              <Modal
                open={isOpen}
                onOpenChange={(v) => (v ? open() : close())}
                title="LINE 공식 계정으로 이동할까요?"
                actions={[
                  { label: "취소", variant: "secondary", onClick: close },
                  {
                    label: "LINE으로 이동",
                    variant: "primary",
                    onClick: () => {
                      close();
                      openChat();
                    },
                  },
                ]}
              >
                이 상담은 LINE 앱에서만 이용할 수 있습니다. <br />
                LINE이 설치되어 있지 않다면 이용이 불가하니, 설치 후 다시
                시도해주세요.
              </Modal>
            </div>
            <div className={s.supportRow}>
              <div className={s.supportItem}>
                <div className={s.supportTitle}>전화 상담</div>
                <div className={s.supportDesc}>고객센터 02-1234-5678</div>
              </div>
              <Button onClick={callCenter} variant="secondary">
                전화 하기
              </Button>
            </div>
          </Card>

          <Card className={s.sectionCard}>
            <div className={s.sectionHeader}>
              <span className={s.sectionKicker}>문제 접수</span>
            </div>

            <label className={s.fieldLabel} htmlFor="reason">
              사유
            </label>
            <div className={s.textareaWrap}>
              <textarea
                id="reason"
                className={s.textarea}
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
                placeholder="예: 충전이 안돼요 / 분실했습니다 등"
                maxLength={500}
              />
              <div className={s.charCounter}>{desc.length}/500</div>
            </div>

            <input
              ref={fileInputRefPick}
              className={s.fileInput}
              type="file"
              accept="image/*"
              onChange={onPickFile}
              hidden
            />
            <input
              ref={fileInputRefCamera}
              className={s.fileInput}
              type="file"
              accept="image/*"
              capture="environment"
              onChange={onPickFile}
              hidden
            />

            <div
              className={s.dropzone}
              role="group"
              aria-label="이미지 업로드 영역"
            >
              {previewUrl ? (
                <div className={s.previewWrap}>
                  <img
                    className={s.previewImg}
                    src={previewUrl}
                    alt="첨부 이미지 미리보기"
                  />
                  <div className={s.previewOverlay}>
                    <div className={s.previewActions}>
                      <button
                        type="button"
                        className={s.ghostBtn}
                        onClick={onPickClick}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="18"
                          height="18"
                          fill="currentColor"
                          viewBox="0 0 16 16"
                        >
                          <path d="M15 12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h1.172a3 3 0 0 0 2.12-.879l.83-.828A1 1 0 0 1 6.827 3h2.344a1 1 0 0 1 .707.293l.828.828A3 3 0 0 0 12.828 5H14a1 1 0 0 1 1 1zM2 4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-1.172a2 2 0 0 1-1.414-.586l-.828-.828A2 2 0 0 0 9.172 2H6.828a2 2 0 0 0-1.414.586l-.828.828A2 2 0 0 1 3.172 4z" />
                          <path d="M8 11a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5m0 1a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7M3 6.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0" />
                        </svg>
                      </button>

                      <button
                        type="button"
                        className={s.ghostBtn}
                        onClick={(e) => {
                          e.preventDefault();
                          clearFile();
                        }}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="18"
                          height="18"
                          fill="currentColor"
                          viewBox="0 0 16 16"
                        >
                          <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z" />
                          <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className={s.dropInner}>
                  <div className={s.dropHint}>
                    장소·상태가 보이도록 촬영해주세요.
                    <br />
                    (개인정보 노출 주의, 최대 {MAX_MB}MB)
                  </div>
                  <div className={s.pickRow}>
                    <button
                      type="button"
                      className={s.iconBtn}
                      onClick={onPickClick}
                      aria-label="앨범에서 선택"
                      title="앨범에서 선택"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 16 16"
                        className={s.iconSvg}
                        aria-hidden="true"
                      >
                        <path d="M15 12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h1.172a3 3 0 0 0 2.12-.879l.83-.828A1 1 0 0 1 6.827 3h2.344a1 1 0 0 1 .707.293l.828.828A3 3 0 0 0 12.828 5H14a1 1 0 0 1 1 1zM2 4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-1.172a2 2 0 0 1-1.414-.586l-.828-.828A2 2 0 0 0 9.172 2H6.828a2 2 0 0 0-1.414.586l-.828.828A2 2 0 0 1 3.172 4z" />
                        <path d="M8 11a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5m0 1a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7M3 6.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0" />
                      </svg>
                    </button>
                  </div>
                </div>
              )}
            </div>

            <div className={s.formActions}>
              <Button onClick={submitTicket} variant="primary">
                제출하기
              </Button>
              <Button onClick={open} variant="secondary">
                상담으로 문의
              </Button>
            </div>

            <div className={s.smallActions}>
              <Button variant="secondary">내 신고 내역 보기</Button>
            </div>
          </Card>
        </main>
      </div>
    </div>
  );
}
