import React, { memo, useState, ChangeEvent, FormEvent } from "react";
import type { FC } from "react";
import Card from "@mui/material/Card";
import OutlinedInput from "@mui/material/OutlinedInput";
import Typography from "@mui/material/Typography";
import {
  Box,
  Button,
  FormHelperText,
  InputLabel,
  FormControl,
  Select,
  MenuItem,
  SelectChangeEvent,
} from "@mui/material";

export interface Option {
  value: string;
  label: string;
}

export interface Field {
  name: string;
  label: string;
  validate?: (value: string) => string | null; // Validation function returning error message or null
  options?: Option[]; // Optional options array for select fields
}

interface IProps {
  title?: string;
  fields: Field[];
  onSubmit: (data: Record<string, string>) => void;
}

const FormCard: FC<IProps> = ({ title = "Form", fields, onSubmit }) => {
  const [formData, setFormData] = useState<Record<string, string>>(
    Object.fromEntries(fields.map((field) => [field.name, ""])),
  );
  const [errors, setErrors] = useState<Record<string, string | null>>({});

  const handleChange = (
    e: ChangeEvent<HTMLInputElement> | SelectChangeEvent<string>,
  ) => {
    const { name, value } = e.target;
    if (name) {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    const validationErrors: Record<string, string | null> = {};

    // Validate each field if validation function is provided
    fields.forEach((field) => {
      const value = formData[field.name];
      if (field.validate) {
        validationErrors[field.name] = field.validate(value);
      } else if (!value) {
        validationErrors[field.name] = `${field.label} is required`;
      }
    });

    // Filter out null errors
    const hasErrors = Object.values(validationErrors).some((error) => error);
    if (hasErrors) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    onSubmit(formData); // Pass form data to parent
  };

  return (
    <Card sx={{ minWidth: 275, maxWidth: 500, margin: "auto", padding: 2 }}>
      <Typography variant="h5" component="div">
        {title}
      </Typography>
      <br />
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{ display: "flex", flexDirection: "column", gap: 2 }}
      >
        {fields.map((field) => (
          <FormControl
            key={field.name}
            variant="outlined"
            error={!!errors[field.name]}
          >
            <InputLabel htmlFor={`${field.name}-input`}>
              {field.label}
            </InputLabel>
            {field.options ? (
              <Select
                id={`${field.name}-input`}
                label={field.label}
                name={field.name}
                value={formData[field.name]}
                onChange={(e) => handleChange(e as SelectChangeEvent<string>)}
                aria-describedby={`${field.name}-error-text`}
              >
                {field.options.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </Select>
            ) : (
              <OutlinedInput
                id={`${field.name}-input`}
                label={field.label}
                name={field.name}
                value={formData[field.name]}
                onChange={(e) =>
                  handleChange(e as ChangeEvent<HTMLInputElement>)
                }
                aria-describedby={`${field.name}-error-text`}
              />
            )}
            {errors[field.name] && (
              <FormHelperText id={`${field.name}-error-text`}>
                {errors[field.name]}
              </FormHelperText>
            )}
          </FormControl>
        ))}
        <Button type="submit" variant="contained">
          Submit
        </Button>
      </Box>
    </Card>
  );
};

export default memo(FormCard);
