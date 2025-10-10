"use server";

import { Resend } from "resend";
import { EmailTemplate } from "@/components/email/contact-form";
import { contactSchema } from "@/schema/contact-schema";

const resend = new Resend(process.env.RESEND_API_KEY);

export type FormState = {
  message: string;
  fields?: Record<string, string>;
  issues?: string[];
};

export async function sendEmail(
  prevState: FormState,
  data: FormData
): Promise<FormState> {
  const formData = Object.fromEntries(data);
  const parsed = contactSchema.safeParse(formData);

  if (!parsed.success) {
    const fields: Record<string, string> = {};
    for (const key of Object.keys(formData)) {
      fields[key] = formData[key].toString();
    }
    return {
      message: "Invalid form data",
      fields,
      issues: parsed.error.issues.map((issue) => issue.message),
    };
  }
  try {
    const { name, email, subject, source, message } = parsed.data;

    const data = await resend.emails.send({
      from: `${source} <${process.env.FROM_EMAIL}>`,
      to: `${process.env.TO_EMAIL}`,
      subject,
      react: EmailTemplate({ name, email, message }),
    });

    return { message: "Email Sent Successfully!" };
  } catch (error) {
    return {
      message: "",
      fields: parsed.data,
      issues: [
        "Failed to send email. Please check your internet connection and try again.",
      ],
    };
  }
}
