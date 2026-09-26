import Image from 'next/image';
import { experience } from '@/content/portfolio';
export default function Experience() {
  return (
    <section id="experience" className="section container" aria-labelledby="experience-title">
      <div className="section-heading">
        <div>
          <p className="eyebrow">Career path</p>
          <h2 id="experience-title">Experience along the way.</h2>
        </div>
        <p>
          From project engineering
          <br />
          to frontend development.
        </p>
      </div>
      <ol className="career-timeline">
        {experience.map((item, index) => (
          <li key={`${item.company}-${item.role}`}>
            <div className="career-date">
              <span className="career-node" aria-hidden="true" />
              <p>{item.period}</p>
            </div>
            <article className={`career-card ${index === 0 ? 'career-latest' : ''}`}>
              <div className="career-company">
                <Image
                  className={`company-logo ${item.logo.includes('clari5') ? 'company-logo-wordmark' : ''}`}
                  src={item.logo}
                  alt={`${item.company} logo`}
                  width={56}
                  height={56}
                />
                <p>{item.company}</p>
                {item.current && <span className="record-badge">Current role</span>}
              </div>
              <h3>{item.role}</h3>
              <p className="career-summary">{item.summary}</p>
              {item.technologies.length > 0 && (
                <ul className="tags" aria-label={`${item.role} technologies`}>
                  {item.technologies.map((tech) => (
                    <li key={tech}>{tech}</li>
                  ))}
                </ul>
              )}
            </article>
          </li>
        ))}
      </ol>
    </section>
  );
}
