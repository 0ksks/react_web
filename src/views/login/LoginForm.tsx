import React from "react";
import FormCard, { Field } from "@/components/form-card";
import useRequests from "@/service/request";
import { notify } from "@/utils/notificationEnhance";
import { LOGIN } from "@/constant";
const LoginForm = () => {
  const requests = useRequests();
  const fields: Field[] = [
    {
      name: "phone",
      label: "Phone",
      validate: (value: string) =>
        !value.match(/^\d+$/) ? "Phone must be a number" : null,
    },
    { name: "password", label: "Password" },
    { name: "token", label: "Token" },
  ];
  const handleFormSubmit = async (data: Record<string, string>) => {
    try {
      const response = await requests.post({
        url: LOGIN,
        data,
        headers: { authType: "mock" },
      });
      notify.auto(response);
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return <FormCard title="Login" fields={fields} onSubmit={handleFormSubmit} />;
};

export default LoginForm;
