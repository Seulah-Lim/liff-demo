import { lazy } from "react";
//import { deviceBrowserInfo } from "../../utils/deviceBrowserInfo.ts";

//const Login_desktop = lazy(() => import("./Login_desktop.tsx"));
const Login_mobile = lazy(() => import("./Login_mobile.tsx"));

const Login = () => {
  //  const deviceBrowser = deviceBrowserInfo();

  return <Login_mobile />;
  //   return deviceBrowser === "liff-webview" ? (
  //     <Login_mobile />
  //   ) : (
  //     <Login_desktop />
  //   );
};

export default Login;
