import React from "react";
import FormCard, { Field } from "@/components/form-card";
import useRequests from "@/service/request";
import { notify } from "@/utils/notificationEnhance";
import { REGISTER } from "@/constant";
import { useLocation } from "react-router-dom";
const RegisterForm = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const authType = searchParams.get("authType");
  const phone = searchParams.get("phone");
  const requests = useRequests();
  const fields: Field[] = [
    {
      name: "username",
      label: "Username",
    },
    { name: "password", label: "Password" },
    { name: "pubKey", label: "Public Key" },
    { name: "token", label: "Token" },
  ];
  const handleFormSubmit = async (data: Record<string, string>) => {
    try {
      const response = await requests.post({
        url: REGISTER,
        data,
        params: {
          authType,
          phone,
        },
      });
      notify.auto(response);
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <FormCard title="Register" fields={fields} onSubmit={handleFormSubmit} />
  );
};

export default RegisterForm;
