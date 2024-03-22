import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().trim().min(1, {
    message: "Name is required.",
  }),
  subject: z.string().trim().min(1, {
    message: "Subject is required.",
  }),
  email: z.string().trim().email({
    message: "Invalid email address.",
  }),
  message: z.string().trim().min(1, {
    message: "Message is required.",
  }),
  source: z.string().trim().min(1, {
    message: "Source is required.",
  }),
});
