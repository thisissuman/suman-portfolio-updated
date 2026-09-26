import {
  ArrowUpRightIcon,
  ArrowDownIcon,
  GithubLogoIcon,
  LinkedinLogoIcon,
  FileArrowDownIcon,
  MapPinIcon,
} from '@phosphor-icons/react/dist/ssr';
import Image from 'next/image';
import portrait from '@/public/linkedin-portrait.jpg';
import { profile } from '@/content/portfolio';
export default function Hero() {
  return (
    <section id="home" className="hero container" aria-labelledby="hero-title">
      <div className="hero-copy">
        <p className="eyebrow">
          <span className="small-line" aria-hidden="true" />
          {profile.role}
        </p>
        <h1 id="hero-title">
          Suman<span className="name-dot">.</span>
          <span className="hero-statement">
            Engineering the interface.
            <br />
            Crafting the experience.
          </span>
        </h1>
        <p className="hero-description">{profile.introduction}</p>
        <div className="actions">
          <a className="button button-primary" href="#projects">
            Explore my work <ArrowUpRightIcon size={20} aria-hidden="true" />
          </a>
          <a className="button button-secondary" href="#contact">
            Let’s talk <ArrowUpRightIcon size={20} aria-hidden="true" />
          </a>
        </div>
        <div className="hero-links">
          {profile.socials.map((social) => (
            <a key={social.label} href={social.url} target="_blank" rel="noopener noreferrer">
              {social.label === 'GitHub' ? (
                <GithubLogoIcon size={19} aria-hidden="true" />
              ) : (
                <LinkedinLogoIcon size={19} aria-hidden="true" />
              )}
              {social.label}
              <span aria-hidden="true"> ↗</span>
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
          ))}
          <a href={profile.resume} download>
            <FileArrowDownIcon size={19} aria-hidden="true" />
            Resume
            <span className="sr-only"> (PDF download)</span>
          </a>
        </div>
      </div>
      <figure className="portrait-block">
        <div className="portrait-orbit" aria-hidden="true" />
        <div className="portrait-frame">
          <Image
            src={portrait}
            alt="Suman Kumar Maharana"
            sizes="(max-width: 767px) 240px, (max-width: 1023px) 300px, 380px"
            loading="eager"
            fetchPriority="high"
          />
        </div>
        <figcaption>
          <span>
            <MapPinIcon size={15} aria-hidden="true" /> Bengaluru, India
          </span>
          <span className="portrait-caption">The person behind the pixels.</span>
        </figcaption>
      </figure>
      <div className="hero-bottom">
        <p>
          React <span>/</span> Next.js <span>/</span> TypeScript <span>/</span> Node.js
        </p>
        <a href="#projects">
          Selected work <ArrowDownIcon size={18} aria-hidden="true" />
        </a>
      </div>
    </section>
  );
}
