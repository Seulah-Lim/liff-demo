import { toast } from "react-toastify";
export const showError = (msg: string) => toast.error(msg, { icon: false });
