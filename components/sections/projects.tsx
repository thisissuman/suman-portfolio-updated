import { ArrowUpRightIcon, GithubLogoIcon } from '@phosphor-icons/react/dist/ssr';
import Image from 'next/image';
import { projects } from '@/content/portfolio';
export default function Projects() {
  return (
    <section id="projects" className="section container" aria-labelledby="projects-title">
      <div className="section-heading">
        <div>
          <p className="eyebrow">Selected projects</p>
          <h2 id="projects-title">Ideas turned into interfaces.</h2>
        </div>
        <p>
          A few things I’ve built.
          <br />
          Explore the experience, then the code.
        </p>
      </div>
      <div className="project-grid">
        {projects.map((project, index) => (
          <article
            className={`project-card ${index === 0 ? 'project-featured' : ''}`}
            key={project.title}
          >
            <div className="project-image">
              <Image
                src={project.image}
                alt={project.imageAlt}
                sizes="(max-width: 767px) calc(100vw - 40px), (max-width: 1199px) 50vw, 600px"
              />
              <span className="project-category">{project.category}</span>
            </div>
            <div className="project-details">
              <div>
                <p className="project-status">
                  {index === 0 && <span className="featured-label">Featured project</span>}
                  {project.status}
                </p>
                <h3>{project.title}</h3>
                <p className="project-description">{project.description}</p>
                <ul className="tags" aria-label={`${project.title} technologies`}>
                  {project.tags.map((tag) => (
                    <li key={tag}>{tag}</li>
                  ))}
                </ul>
              </div>
              <div className="project-links">
                {project.demoAvailable ? (
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Live demo: ${project.title} (opens in a new tab)`}
                  >
                    Live demo <ArrowUpRightIcon size={18} aria-hidden="true" />
                  </a>
                ) : (
                  <span>No public demo</span>
                )}
                <a
                  href={project.source}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Source code: ${project.title} (opens in a new tab)`}
                >
                  <GithubLogoIcon size={18} aria-hidden="true" /> Source code
                </a>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
