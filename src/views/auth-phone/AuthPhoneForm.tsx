import React, { useState, useEffect } from "react";
import FormCard, { Field, Option } from "@/components/form-card";
import useRequests from "@/service/request";
const AuthPhoneForm = () => {
  const [schoolOptions, setSchoolOptions] = useState<Option[]>([]);
  const requests = useRequests();
  // Fetch options on mount
  useEffect(() => {
    const fetchSchoolName = async () => {
      try {
        const response = await requests.get<Option[]>({
          url: "/user/auth_type",
        });
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
      const response = await requests.post({ url: "/user/auth_phone", data });
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <FormCard title="Auth Phone" fields={fields} onSubmit={handleFormSubmit} />
  );
};

export default AuthPhoneForm;
