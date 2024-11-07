// notificationService.ts
import store from "@/store"; // import your Redux store
import { changeSnackbarPropsAction } from "@/store/modules/notification";
import { SnackbarProps, AlertProps } from "@mui/material";
import IResponse from "@/service/request/type";

interface NotifyParams extends SnackbarProps {
  alertProps?: AlertProps;
  message: string;
}

const show = (params: NotifyParams) => {
  store.dispatch(changeSnackbarPropsAction(params));
};

const success = (response: IResponse) => {
  show({ message: response.msg, alertProps: { severity: "success" } });
};

const error = (response: IResponse) => {
  show({ message: response.msg, alertProps: { severity: "error" } });
};

const info = (response: IResponse) => {
  show({ message: response.msg, alertProps: { severity: "info" } });
};

const warning = (response: IResponse) => {
  show({ message: response.msg, alertProps: { severity: "warning" } });
};

const auto = (response: IResponse) => {
  const severity = response.code === "00000" ? "success" : "error";
  show({ message: response.msg, alertProps: { severity } });
};

export const notify = { show, success, error, info, warning, auto };
