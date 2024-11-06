import React from "react";
import FormCard from "@/components/form-card";

const LoginForm = () => {
  const fields = [
    { name: "school", label: "School" },
    {
      name: "phone",
      label: "Phone",
      validate: (value: string) =>
        !value.match(/^\d+$/) ? "Phone must be a number" : null,
    },
  ];

  const handleFormSubmit = (data: Record<string, string>) => {
    console.log("Form submitted:", data);
  };

  return (
    <FormCard title="Auth Phone" fields={fields} onSubmit={handleFormSubmit} />
  );
};

export default LoginForm;
