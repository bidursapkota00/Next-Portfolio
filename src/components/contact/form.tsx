"use client";
import React, {
  FormEvent,
  startTransition,
  useRef,
  useTransition,
} from "react";
import { useFormState } from "react-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { sendEmail } from "@/actions/send-email";
import { contactSchema } from "@/schema/contact-schema";
import ContactInput from "./input";

export default function ContactForm() {
  const [isPending, startTransition] = useTransition();

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
    form.handleSubmit(() => {
      startTransition(() => {
        formAction(new FormData(formRef.current!));
      });
    })(e);
  };

  return (
    <form
      className="contact__form"
      id="portfolio-contact-form"
      ref={formRef}
      action={formAction}
      onSubmit={submitForm}
    >
      {state?.message !== "" && !state.issues && (
        <div className="text-red-500">{state.message}</div>
      )}
      {state?.issues && (
        <div className="text-red-500">
          <ul>
            {state.issues.map((issue) => (
              <li key={issue} className="flex gap-1">
                {/* <X fill="red" /> */}
                {issue}
              </li>
            ))}
          </ul>
        </div>
      )}

      <ContactInput
        form={form}
        inputName="name"
        inputPlaceholder="Name"
        type="text"
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
        <button className="contact__button" type="submit" disabled={isPending}>
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
