import { profile } from '@/content/portfolio';
import ContactForm from '@/components/contact-form';
export default function Contact() {
  return (
    <section id="contact" className="contact-section" aria-labelledby="contact-title">
      <div className="container contact-grid">
        <div className="contact-copy">
          <p className="eyebrow">Let’s connect</p>
          <h2 id="contact-title">
            Good things start
            <br />
            with a conversation.
          </h2>
          <p>
            Have a project in mind, an opportunity to share, or just want to say hello? I’d love to
            hear from you.
          </p>
          <a className="email-link" href={`mailto:${profile.email}`}>
            {profile.email}
            <span aria-hidden="true"> ↗</span>
          </a>
          <div className="hero-links">
            {profile.socials.map((social) => (
              <a key={social.label} href={social.url} target="_blank" rel="noopener noreferrer">
                {social.label}
                <span aria-hidden="true"> ↗</span>
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
            ))}
          </div>
        </div>
        <ContactForm />
      </div>
    </section>
  );
}
