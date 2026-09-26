export type ContactFields = { senderEmail: string; message: string };
export type ContactState = {
  status: 'idle' | 'error' | 'success';
  message: string;
  errors?: Partial<Record<keyof ContactFields, string>>;
  values?: ContactFields;
};
export const initialContactState: ContactState = { status: 'idle', message: '' };
export const contactLimits = { email: 254, message: 5000, minimum: 10 } as const;

export function validateContact(
  form: FormData,
): { ok: true; fields: ContactFields } | { ok: false; state: ContactState } {
  const rawEmail = form.get('senderEmail');
  const rawMessage = form.get('message');
  const senderEmail = typeof rawEmail === 'string' ? rawEmail.trim() : '';
  const message = typeof rawMessage === 'string' ? rawMessage.trim() : '';
  const errors: NonNullable<ContactState['errors']> = {};
  // Practical mailbox validation, not an attempt to implement all of RFC 5322.
  if (
    senderEmail.length > contactLimits.email ||
    !/^[^\s@<>]+@[^\s@<>.]+(?:\.[^\s@<>.]+)+$/.test(senderEmail)
  ) {
    errors.senderEmail = 'Enter a valid email address, such as name@example.com.';
  }
  if (message.length < contactLimits.minimum || message.length > contactLimits.message) {
    errors.message = 'Write a message between 10 and 5,000 characters.';
  }
  const values = {
    senderEmail: senderEmail.slice(0, contactLimits.email),
    message: message.slice(0, contactLimits.message),
  };
  if (Object.keys(errors).length)
    return {
      ok: false,
      state: { status: 'error', message: 'Please check the highlighted fields.', errors, values },
    };
  return { ok: true, fields: values };
}
