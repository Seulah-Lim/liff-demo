import liff from "@line/liff";
import LIFFInspectorPlugin from "@line/liff-inspector";
import { LiffMockPlugin } from "@line/liff-mock";

export function installPlugins(enableMock: boolean, log?: (m: string) => void) {
  if (enableMock) {
    liff.use(new LiffMockPlugin());
    log?.("init:use LiffMockPlugin");
  }
  if (window.location.search.includes("li.origin")) {
    liff.use(new LIFFInspectorPlugin());
    log?.("init:use LIFFInspectorPlugin");
  }
}
