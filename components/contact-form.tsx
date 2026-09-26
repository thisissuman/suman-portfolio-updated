'use client';
import { useActionState, useEffect, useRef } from 'react';
import { sendEmail } from '@/actions/sendEmail';
import { contactLimits, initialContactState } from '@/lib/contact';
export default function ContactForm() {
  const [state, action, pending] = useActionState(sendEmail, initialContactState);
  const statusRef = useRef<HTMLParagraphElement>(null);
  useEffect(() => {
    if (state.status !== 'idle') statusRef.current?.focus();
  }, [state]);
  return (
    <form action={action} className="contact-form" aria-busy={pending}>
      <div className="honeypot" aria-hidden="true">
        <label htmlFor="website">Leave this field empty</label>
        <input id="website" name="website" tabIndex={-1} autoComplete="off" />
      </div>
      <div className="form-field">
        <label htmlFor="senderEmail">Your email</label>
        <input
          id="senderEmail"
          name="senderEmail"
          type="email"
          autoComplete="email"
          placeholder="you@example.com"
          required
          maxLength={contactLimits.email}
          defaultValue={state.values?.senderEmail ?? ''}
          aria-invalid={Boolean(state.errors?.senderEmail)}
          aria-describedby={state.errors?.senderEmail ? 'email-error' : undefined}
          disabled={pending}
        />
        {state.errors?.senderEmail && (
          <p className="field-error" id="email-error">
            {state.errors.senderEmail}
          </p>
        )}
      </div>
      <div className="form-field">
        <label htmlFor="message">What’s on your mind?</label>
        <textarea
          id="message"
          name="message"
          rows={5}
          placeholder="Tell me a little about your idea or opportunity…"
          required
          minLength={contactLimits.minimum}
          maxLength={contactLimits.message}
          defaultValue={state.values?.message ?? ''}
          aria-invalid={Boolean(state.errors?.message)}
          aria-describedby={state.errors?.message ? 'message-error' : 'message-help'}
          disabled={pending}
        />
        {state.errors?.message ? (
          <p className="field-error" id="message-error">
            {state.errors.message}
          </p>
        ) : (
          <p className="field-help" id="message-help">
            10–5,000 characters. Your message is sent privately by email.
          </p>
        )}
      </div>
      <button className="button button-primary" type="submit" disabled={pending}>
        {pending ? 'Sending message…' : 'Send message'}
        <span aria-hidden="true">↗</span>
      </button>
      <p
        ref={statusRef}
        tabIndex={-1}
        className={`form-status ${state.status}`}
        role="status"
        aria-live="polite"
      >
        {pending ? 'Sending your message…' : state.message}
      </p>
    </form>
  );
}
