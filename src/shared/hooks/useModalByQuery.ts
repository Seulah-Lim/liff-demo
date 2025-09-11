import { useCallback, useMemo } from "react";
import { useSearchParams } from "react-router";

/** 단일 모달 키를 URL ?modal= 로 관리 */
export function useModalByQuery(key: string, param: string = "modal") {
  const [sp, setSp] = useSearchParams();

  const list = sp.getAll(param);
  const isOpen = list.includes(key);

  const open = useCallback(() => {
    const next = new URLSearchParams(sp);
    const already = next.getAll(param).includes(key);
    if (!already) next.append(param, key);
    // push: 뒤로가기 시 닫히도록
    setSp(next, { replace: false });
  }, [key, param, sp, setSp]);

  const close = useCallback(() => {
    const next = new URLSearchParams(sp);
    const remain = next.getAll(param).filter((k) => k !== key);
    next.delete(param);
    remain.forEach((k) => next.append(param, k));
    // replace: 수동 닫기는 히스토리 오염 방지
    setSp(next, { replace: true });
  }, [key, param, sp, setSp]);

  return useMemo(() => ({ isOpen, open, close }), [isOpen, open, close]);
}
