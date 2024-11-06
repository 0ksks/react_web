import React from "react";
import FormCard from "@/components/form-card";
import { authPhone } from "@/service/user";

const AuthPhoneForm = () => {
  const fields = [
    { name: "school", label: "School" },
    {
      name: "phone",
      label: "Phone",
      validate: (value: string) =>
        !value.match(/^\d+$/) ? "Phone must be a number" : null,
    },
  ];

  const handleFormSubmit = async (data: Record<string, string>) => {
    try {
      const response = await authPhone(data);
      console.log("Form submitted:", data);
      console.log("Response:", response);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <FormCard title="Auth Phone" fields={fields} onSubmit={handleFormSubmit} />
  );
};

export default AuthPhoneForm;
