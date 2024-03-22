import { Resend } from "resend";
import { EmailTemplate } from "@/components/email/contact-form";
import { NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);

async function POST(req: Request) {
  return NextResponse.json(
    { message: "Email Sent Successfully!" },
    { status: 200 }
  );
  try {
    const {
      name,
      email,
      subject = "Portfolio Contact Me",
      source = "Portfolio",
    } = await req.json();
    const data = await resend.emails.send({
      from: `${source} <${process.env.FROM_EMAIL}>`,
      to: `${process.env.TO_EMAIL}`,
      subject,
      react: EmailTemplate({ name, email }),
    });

    return NextResponse.json(
      { message: "Email Sent Successfully!" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to send Email!" },
      { status: 500 }
    );
  }
}

export { POST };
