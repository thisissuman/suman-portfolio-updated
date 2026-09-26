import { createHash } from 'node:crypto';
import { validateContact, type ContactFields, type ContactState } from './contact';
import { createRateLimiter } from './rate-limit';
const senderAllowed = createRateLimiter(3, 15 * 60 * 1000);
const totalAllowed = createRateLimiter(20, 60 * 60 * 1000, 1);
type Dependencies = {
  configured: boolean;
  deliver: (fields: ContactFields) => Promise<boolean>;
  allowSender?: (key: string) => boolean;
  allowTotal?: (key: string) => boolean;
};
export async function submitContact(
  form: FormData,
  dependencies: Dependencies,
): Promise<ContactState> {
  if (form.get('website'))
    return { status: 'error', message: 'Unable to submit this form. Please contact me by email.' };
  const validation = validateContact(form);
  if (!validation.ok) return validation.state;
  const { fields } = validation;
  if (!dependencies.configured)
    return {
      status: 'error',
      message:
        'The contact form is temporarily unavailable. Please use the email link beside the form.',
      values: fields,
    };
  const senderKey = createHash('sha256').update(fields.senderEmail.toLowerCase()).digest('hex');
  if (
    !(dependencies.allowSender ?? senderAllowed)(senderKey) ||
    !(dependencies.allowTotal ?? totalAllowed)('all')
  ) {
    return {
      status: 'error',
      message: 'Too many messages. Please try again later or use the email link.',
      values: fields,
    };
  }
  try {
    if (await dependencies.deliver(fields))
      return {
        status: 'success',
        message: 'Your message has been sent. Thank you for getting in touch!',
      };
  } catch {
    // Never return API details, credentials or user content in logs or UI.
  }
  return {
    status: 'error',
    message: 'Your message could not be sent. Please try again or use the email link.',
    values: fields,
  };
}
