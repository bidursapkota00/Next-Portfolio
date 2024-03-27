import React from "react";
import { UseFormReturn } from "react-hook-form";

interface FormFields {
  name: string;
  email: string;
  message: string;
  source: string;
  subject: string;
}

interface Form extends UseFormReturn<FormFields> {}

export default function ContactInput({
  form,
  inputName,
  inputPlaceholder,
  type,
  focus,
}: {
  form: Form;
  inputName: "name" | "email" | "message" | "source" | "subject";
  inputPlaceholder: string;
  type: "text" | "email" | "password";
  focus?: boolean;
}) {
  return (
    <div className="relative">
      <input
        {...form.register(inputName)}
        className="contact__input"
        style={
          form.formState.errors[inputName]
            ? {
                border: "1px solid rgb(239,68,68,0.5)",
                marginBottom: "30px",
              }
            : {}
        }
        type={type}
        id={inputName}
        name={inputName}
        placeholder={inputPlaceholder}
        defaultValue={form.formState.defaultValues?.[inputName]}
        autoFocus={focus || false}
      />
      {form.formState.errors[inputName] && (
        <p className="text-sm text-red-500 absolute top-[calc(100%-30px)] left-0">
          {form.formState.errors[inputName]?.message}
        </p>
      )}
    </div>
  );
}
