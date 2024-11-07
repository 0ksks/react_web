import React, { useState, useEffect } from "react";
import FormCard, { Field, Option } from "@/components/form-card";
import useRequests from "@/service/request";
import { notify } from "@/utils/notificationEnhance";
import { AUTH_PHONE, AUTH_TYPE } from "@/constant";
const AuthPhoneForm = () => {
  const [schoolOptions, setSchoolOptions] = useState<Option[]>([]);
  const requests = useRequests();
  useEffect(() => {
    const fetchSchoolName = async () => {
      try {
        const response = await requests.get<Option[]>({
          url: AUTH_TYPE,
        });
        if (response?.data) {
          setSchoolOptions(response.data); // Update state with fetched options
        }
      } catch (error) {
        console.error("Error fetching school options:", error);
      }
    };

    fetchSchoolName();
  }, [requests]);

  // Define fields with the options from state
  const fields: Field[] = [
    { name: "authType", label: "School", options: schoolOptions },
    {
      name: "phone",
      label: "Phone",
      validate: (value: string) =>
        !value.match(/^\d+$/) ? "Phone must be a number" : null,
    },
  ];
  const handleFormSubmit = async (data: Record<string, string>) => {
    console.log(data);
    try {
      const response = await requests.post({
        url: AUTH_PHONE,
        data,
      });
      notify.auto(response);
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <FormCard title="Auth Phone" fields={fields} onSubmit={handleFormSubmit} />
  );
};

export default AuthPhoneForm;
