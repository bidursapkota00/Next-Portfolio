"use client";
import React, { FormEvent, useRef, useTransition, useEffect } from "react";
import { useFormState } from "react-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { sendEmail } from "@/actions/send-email";
import { contactSchema } from "@/schema/contact-schema";
import ContactInput from "./input";
import { FormMessageError } from "@/components/ui/comps/alert-error";
import { FormMessageSuccess } from "@/components/ui/comps/alert-success";

export default function ContactForm() {
  const [isPending, startTransition] = useTransition();
  const [clientError, setClientError] = React.useState<string | null>(null);

  const [state, formAction] = useFormState(sendEmail, {
    message: "",
  });
  const form = useForm<z.output<typeof contactSchema>>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
      source: "Portfolio",
      ...(state?.fields ?? {}),
    },
  });

  const formRef = useRef<HTMLFormElement>(null);

  const submitForm = (e: FormEvent) => {
    e.preventDefault();
    setClientError(null); // Clear any previous client errors

    form.handleSubmit(() => {
      startTransition(async () => {
        try {
          formAction(new FormData(formRef.current!));
        } catch (error) {
          console.error("Form submission error:", error);
          setClientError(
            "Unable to send message. Please check your internet connection and try again."
          );
        }
      });
    })(e);
  };

  useEffect(() => {
    if (state.message !== "" && !state.issues) {
      form.reset();
      setClientError(null);
    }
  }, [state, form]);

  return (
    <form
      className="contact__form"
      id="portfolio-contact-form"
      ref={formRef}
      action={formAction}
      onSubmit={submitForm}
    >
      {state?.message !== "" && !state.issues && (
        <div className="p-[20px_0]">
          <FormMessageSuccess success={state.message} />
        </div>
      )}

      {(state?.issues || clientError) && (
        <div className="p-[20px_0]">
          <FormMessageError
            error={
              clientError ||
              state.issues?.reduce((prev, issue) => prev + issue + "<br/>", "")
            }
          />
        </div>
      )}

      <ContactInput
        form={form}
        inputName="name"
        inputPlaceholder="Name"
        type="text"
        focus={state.message ? true : false}
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
          defaultValue={form.formState.defaultValues?.message}
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

      <div className="flex items-center mb-[100px]">
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
    </form>
  );
}
