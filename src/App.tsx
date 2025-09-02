// import { useEffect } from "react";

import { useEffect } from "react";
import { Outlet } from "react-router";

// import { selectedLanguageStore } from "@app/store/store";
// import { LANGUAGE_LIST } from "@shared/const";
// import { LOGIN_USER_INFO } from "@shared/const/storage";
// import { useTranslation } from "react-i18next";
// import { Outlet, useLocation } from "react-router";
import { useNavigate } from "react-router";
// import { useStore } from "zustand";

function App() {
  // const user = sessionStorage.getItem(LOGIN_USER_INFO);
  const navigate = useNavigate();
  // const location = useLocation();
  // const { setSelectedLanguage } = useStore(selectedLanguageStore);
  // const { i18n } = useTranslation();

  // useEffect(() => {
  //   let unmounted = false;
  //   if (!unmounted) {
  //     if (user === null) {
  //       navigate("/login");
  //     } else if (user !== null && location.pathname === "/") {
  //       navigate("/dashboard");
  //     }
  //   }
  //   const handleDragOver = (e: DragEvent) => {
  //     e.preventDefault();
  //     e.stopPropagation();
  //   };
  //   const handleDrop = (e: DragEvent) => {
  //     e.preventDefault();
  //     e.stopPropagation();
  //   };

  //   window.addEventListener("dragover", handleDragOver);
  //   window.addEventListener("drop", handleDrop);
  //   return () => {
  //     unmounted = true;
  //     window.removeEventListener("dragover", handleDragOver);
  //     window.removeEventListener("drop", handleDrop);
  //   };
  // }, [location.pathname, user, navigate]);

  useEffect(() => {
    navigate({
      pathname: "/login",
      search: location.search, //쿼리
      hash: location.hash, //해쉬
      //쿼리 해시 유지한상태로 이동
    });
  }, [navigate]);
  return (
    <div style={{ display: "flex" }}>
      <Outlet />
    </div>
  );
}

export default App;
