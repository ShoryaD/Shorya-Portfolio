// export const validateString = (
//   value: unknown,
//   maxLength: number
// ): value is string => {
//   return typeof value === "string" && value.trim().length > 0 && value.length <= maxLength;
// };

// export const getErrorMessage = (error: unknown): string => {
//   if (!error) return "An unknown error occurred while sending your message.";

//   if (typeof error === "string") return error;

//   if (typeof error === "object" && error !== null) {
//     if ("message" in error && typeof (error as any).message === "string") {
//       return (error as any).message;
//     }

//     if ("error" in error) {
//       const err = (error as any).error;
//       if (typeof err === "string") return err;
//       if (typeof err === "object" && "message" in err) {
//         return err.message;
//       }
//     }
//   }

//   return "An unknown error occurred while sending your message.";
// };

// export const sanitizeError = (message: string): string => {
//   return message.replace(/https?:\/\/\S+/g, "").trim().replace(/\.$/, "");
// };

export const validateString = (
  value: unknown,
  maxLength: number
): value is string => {
  return (
    typeof value === "string" &&
    value.trim().length > 0 &&
    value.length <= maxLength
  );
};

export const getErrorMessage = (error: unknown): string => {
  if (!error) return "An unknown error occurred while sending your message.";

  if (typeof error === "string") return error;

  if (typeof error === "object" && error !== null) {
    if ("message" in error && typeof (error as any).message === "string") {
      return (error as any).message;
    }

    if ("error" in error) {
      const err = (error as any).error;
      if (typeof err === "string") return err;
      if (typeof err === "object" && "message" in err) {
        return err.message;
      }
    }
  }

  return "An unknown error occurred while sending your message.";
};

export const sanitizeError = (message: string): string => {
  // ✅ 1. Handle known Resend domain error pattern
  const domainMatch = message.match(
    /(The .*?domain is not verified\. Please.*?your domain)/
  );
  if (domainMatch) return domainMatch[1];

  // ✅ 2. Remove trailing URLs
  let sanitized = message.replace(/https?:\/\/\S+/g, "").trim();

  // ✅ 3. Remove dangling words like "on", "at", "to", etc.
  sanitized = sanitized.replace(/\b(on|at|to|in|for|by)\s*$/i, "").trim();

  // ✅ 4. Ensure punctuation at end
  if (!/[.!?]$/.test(sanitized)) {
    sanitized += ".";
  }

  return sanitized;
};