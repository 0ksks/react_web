// notificationService.ts
import store from "@/store"; // import your Redux store
import {
  changeSnackbarPropsAction,
  NotificationState,
} from "@/store/modules/notification";
import IResponse from "@/service/request/type";

const show = (params: NotificationState) => {
  store.dispatch(changeSnackbarPropsAction(params));
};

const success = (response: IResponse) => {
  show({ message: response.msg, alertprops: { severity: "success" } });
};

const error = (response: IResponse) => {
  show({ message: response.msg, alertprops: { severity: "error" } });
};

const info = (response: IResponse) => {
  show({ message: response.msg, alertprops: { severity: "info" } });
};

const warning = (response: IResponse) => {
  show({ message: response.msg, alertprops: { severity: "warning" } });
};

const auto = (response: IResponse) => {
  const severity = response.code === "00000" ? "success" : "error";
  show({ message: response.msg, alertprops: { severity } });
};

export const notify = { show, success, error, info, warning, auto };
