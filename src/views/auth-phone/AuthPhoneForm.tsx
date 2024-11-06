import React, { useState, useEffect } from "react";
import FormCard, { Field, Option } from "@/components/form-card";
import { authPhone } from "@/service/user";
import { getAuthTypes } from "@/service";

const AuthPhoneForm = () => {
  const [schoolOptions, setSchoolOptions] = useState<Option[]>([]);

  // Fetch options on mount
  useEffect(() => {
    const fetchSchoolName = async () => {
      try {
        const response = await getAuthTypes();
        if (response?.data) {
          setSchoolOptions(response.data); // Update state with fetched options
        }
      } catch (error) {
        console.error("Error fetching school options:", error);
      }
    };

    fetchSchoolName();
  }, []);

  // Define fields with the options from state
  const fields: Field[] = [
    { name: "school", label: "School", options: schoolOptions },
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
      console.error("Error submitting form:", error);
    }
  };

  return (
    <FormCard title="Auth Phone" fields={fields} onSubmit={handleFormSubmit} />
  );
};

export default AuthPhoneForm;
