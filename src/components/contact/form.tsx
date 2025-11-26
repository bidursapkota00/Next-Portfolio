"use client";
import React, { FormEvent, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { contactSchema } from "@/schema/contact-schema";
import ContactInput from "./input";
import { FormMessageError } from "@/components/ui/comps/alert-error";
import { FormMessageSuccess } from "@/components/ui/comps/alert-success";

type ContactFormData = z.infer<typeof contactSchema>;

interface ApiResponse {
  success: boolean;
  message: string;
  issues?: string[];
}

export default function ContactForm() {
  const [isPending, setIsPending] = useState(false);
  const [apiResponse, setApiResponse] = useState<ApiResponse | null>(null);

  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
      source: "Portfolio",
    },
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsPending(true);
    setApiResponse(null);

    try {
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      // Check if response is ok (status 200-299)
      if (!response.ok) {
        // Try to parse error response
        try {
          const errorResult: ApiResponse = await response.json();
          setApiResponse(errorResult);
        } catch (parseError) {
          // If JSON parsing fails, show generic error based on status
          setApiResponse({
            success: false,
            message: "Server error",
            issues: [
              response.status === 500
                ? "Server error occurred. Please try again later."
                : response.status === 400
                ? "Invalid form data. Please check your inputs."
                : `Error: ${response.status}. Please try again.`,
            ],
          });
        }
        return;
      }

      const result: ApiResponse = await response.json();

      setApiResponse(result);

      if (result.success) {
        form.reset();
      }
    } catch (error) {
      console.error("Form submission error:", error);
      setApiResponse({
        success: false,
        message: "Network error",
        issues: [
          "Unable to send message. Please check your internet connection and try again.",
        ],
      });
    } finally {
      setIsPending(false);
    }
  };

  const submitForm = (e: FormEvent) => {
    e.preventDefault();
    form.handleSubmit(onSubmit)(e);
  };

  return (
    <form
      className="contact__form relative"
      id="portfolio-contact-form"
      onSubmit={submitForm}
    >
      <ContactInput
        form={form}
        inputName="name"
        inputPlaceholder="Name"
        type="text"
        focus={apiResponse?.success || false}
      />
      <ContactInput
        form={form}
        inputName="email"
        inputPlaceholder="Email"
        type="email"
      />
      <ContactInput
        form={form}
        inputName="subject"
        inputPlaceholder="Subject"
        type="text"
      />

      <div className="relative">
        <textarea
          {...form.register("message")}
          id="message"
          className="contact__textarea"
          style={
            form.formState.errors.message
              ? {
                  border: "1px solid rgb(239,68,68,0.5)",
                  marginBottom: "30px",
                }
              : {}
          }
          name="message"
          placeholder="Message"
          rows={4}
        />
        {form.formState.errors.message && (
          <p className="text-sm text-red-500 absolute top-[calc(100%-36px)] left-0">
            {form.formState.errors.message.message}
          </p>
        )}
      </div>

      <input
        {...form.register("source")}
        style={{ display: "none" }}
        type="text"
        id="source"
        name="source"
        defaultValue="Portfolio"
      />

      <div className="flex items-center">
        <button
          className={`contact__button${
            isPending ? "" : " contact__button__vibrate"
          }`}
          type="submit"
          disabled={isPending}
        >
          Send Message
        </button>
        <span
          className="contact__send__loader"
          style={isPending ? { display: "inline-block" } : {}}
        ></span>
      </div>

      {apiResponse?.success && (
        <div className="p-[20px_0] absolute left-0 bottom-0 translate-y-full w-full">
          <FormMessageSuccess success={apiResponse.message} />
        </div>
      )}

      {apiResponse?.issues && (
        <div className="p-[20px_0] absolute left-0 bottom-0 translate-y-full w-full">
          <FormMessageError
            error={apiResponse.issues.reduce(
              (prev, issue) => prev + issue + "<br/>",
              ""
            )}
          />
        </div>
      )}
    </form>
  );
}
