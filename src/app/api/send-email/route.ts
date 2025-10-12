import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import { EmailTemplate } from "@/components/email/contact-form";
import { contactSchema } from "@/schema/contact-schema";

const resend = new Resend(process.env.RESEND_API_KEY);

// Initialize Upstash Redis
const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

// Create rate limiter
// 5 requests per 10 minutes per IP
const ratelimit = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(5, "10 m"),
  analytics: true,
  prefix: "@upstash/ratelimit",
});

// Add your allowed origins
const ALLOWED_ORIGINS = [process.env.NEXT_PUBLIC_SITE_URL];

export async function POST(request: NextRequest) {
  try {
    // Check origin
    const origin = request.headers.get("origin");
    const referer = request.headers.get("referer");

    // Verify request is from allowed origin
    const isAllowedOrigin = ALLOWED_ORIGINS.some(
      (allowed) => origin === allowed || referer?.startsWith(allowed || "")
    );

    if (!isAllowedOrigin) {
      return NextResponse.json(
        {
          success: false,
          message: "Forbidden",
          issues: ["Access denied"],
        },
        { status: 403 }
      );
    }

    // Get IP address for rate limiting
    const ip =
      request.headers.get("x-forwarded-for")?.split(",")[0] ||
      request.headers.get("x-real-ip") ||
      "anonymous";

    // Check rate limit
    const {
      success: rateLimitSuccess,
      limit,
      reset,
      remaining,
    } = await ratelimit.limit(`contact_${ip}`);

    if (!rateLimitSuccess) {
      return NextResponse.json(
        {
          success: false,
          message: "Too many requests",
          issues: [
            `Rate limit exceeded. Please try again in ${Math.ceil(
              (reset - Date.now()) / 1000 / 60
            )} minutes.`,
          ],
        },
        {
          status: 429,
          headers: {
            "X-RateLimit-Limit": limit.toString(),
            "X-RateLimit-Remaining": remaining.toString(),
            "X-RateLimit-Reset": reset.toString(),
          },
        }
      );
    }

    // Validate form data
    const body = await request.json();
    const parsed = contactSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid form data",
          issues: parsed.error.issues.map((issue) => issue.message),
        },
        { status: 400 }
      );
    }

    const { name, email, subject, source, message } = parsed.data;

    // Send email
    const data = await resend.emails.send({
      from: `${source} <${process.env.FROM_EMAIL}>`,
      to: `${process.env.TO_EMAIL}`,
      subject,
      react: EmailTemplate({ name, email, message }),
    });

    return NextResponse.json(
      {
        success: true,
        message: "Email Sent Successfully!",
      },
      {
        status: 200,
        headers: {
          "X-RateLimit-Limit": limit.toString(),
          "X-RateLimit-Remaining": remaining.toString(),
          "X-RateLimit-Reset": reset.toString(),
        },
      }
    );
  } catch (error) {
    console.error("Email sending error:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to send email. Please try again later.",
        issues: [
          "Failed to send email. Please check your internet connection and try again.",
        ],
      },
      { status: 500 }
    );
  }
}
