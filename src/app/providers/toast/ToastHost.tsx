import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import * as t from "./toast.css";

export function ToastHost() {
  return (
    <ToastContainer
      position="bottom-center"
      autoClose={2000}
      hideProgressBar
      closeButton={false}
      newestOnTop
      draggable={false}
      toastClassName={t.toast}
      limit={2}
    />
  );
}
