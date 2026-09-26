'use server';
import { Resend } from 'resend';
import type { ContactState } from '@/lib/contact';
import { submitContact } from '@/lib/contact-service';
export async function sendEmail(_previous: ContactState, form: FormData): Promise<ContactState> {
  const key = process.env.RESEND_API_KEY;
  const from = process.env.CONTACT_FROM;
  const to = process.env.CONTACT_TO;
  return submitContact(form, {
    configured: Boolean(key && from && to),
    deliver: async ({ senderEmail, message }) => {
      if (!key || !from || !to) return false;
      const { data, error } = await new Resend(key).emails.send({
        from,
        to,
        replyTo: senderEmail,
        subject: 'New portfolio message',
        text: `Reply to: ${senderEmail}\n\n${message}`,
      });
      return Boolean(data?.id && !error);
    },
  });
}
