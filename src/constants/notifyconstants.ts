
import { ToastContainer, toast } from "react-toastify";

export const notify = (message: String) =>
toast.error(message, {
  position: "top-right",
  autoClose: 2000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
});