'use server';

import React from "react";
import { Resend } from "resend";
import { validateString, getErrorMessage, sanitizeError } from "@/lib/utils";
import ContactFormEmail from "@/email/contact-form-email";

const resend = new Resend(process.env.RESEND_API_KEY!);

export const sendEmail = async (formData: FormData) => {
  const mail = formData.get("senderEmail");
  const message = formData.get("senderMessage");

  if (!validateString(mail, 500)) {
    return { error: "Please enter a valid email address." };
  }

  if (!validateString(message, 5000)) {
    return { error: "Your message is too long. Please shorten it." };
  }

  try {
    const result = await resend.emails.send({
      from: "Contact Form <onboarding@resend.dev>",
      to: "shoryadubey7610@gmail.com",
      subject: "Message from contact form",
      replyTo: mail as string,
      react: React.createElement(ContactFormEmail, {
        message,
        mail,
      }),
    });

    if (result && result.error) {
      return {
        error: sanitizeError(getErrorMessage(result.error)),
      };
    }

    return { data: result };
  } catch (error: unknown) {
    return {
      error: sanitizeError(getErrorMessage(error)),
    };
  }
};
