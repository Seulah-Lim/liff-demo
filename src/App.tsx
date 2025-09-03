// import { useEffect } from "react";

import { useEffect } from "react";
import { Outlet } from "react-router";

import { useNavigate } from "react-router";

function App() {
  const navigate = useNavigate();

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
