import { profile, education } from '@/content/portfolio';

const highlightedPhrases = [
  'banking systems',
  'fraud-monitoring dashboards',
  'consumer-facing web applications',
  'Associate Staff Engineer',
  'React',
  'Next.js',
  'automated testing',
  'wedding planning',
  'digital invitations',
] as const;

const professionalSignals = [
  ['Frontend systems', 'Reusable React and Next.js foundations'],
  ['Product delivery', 'Banking, insurance and consumer experiences'],
  ['Quality in practice', 'Testing, accessibility and cross-browser care'],
] as const;

function highlightAboutCopy(paragraph: string) {
  const pattern = new RegExp(`(${highlightedPhrases.join('|').replaceAll('.', '\\.')})`, 'g');
  return paragraph.split(pattern).map((part, index) =>
    highlightedPhrases.includes(part as (typeof highlightedPhrases)[number]) ? (
      <strong className="about-highlight" key={`${part}-${index}`}>
        {part}
      </strong>
    ) : (
      part
    ),
  );
}

export default function About() {
  return (
    <section id="about" className="section container about-section" aria-labelledby="about-title">
      <div>
        <p className="eyebrow">A little about me</p>
        <h2 id="about-title">
          A developer.
          <br />
          Always a learner.
        </h2>
        <ol className="about-signals" aria-label="Professional focus">
          {professionalSignals.map(([title, description], index) => (
            <li key={title}>
              <span aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
              <div>
                <strong>{title}</strong>
                <p>{description}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
      <div className="about-copy">
        {profile.about.map((paragraph) => (
          <p key={paragraph}>{highlightAboutCopy(paragraph)}</p>
        ))}
        <div className="education">
          <span className="education-mark" aria-hidden="true">
            ↗
          </span>
          <div>
            <h3>{education.qualification}</h3>
            <p>
              {education.institution} <span>·</span>{' '}
              <span className="education-year">{education.year}</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
