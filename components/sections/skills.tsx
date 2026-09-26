import { CodeIcon, StackIcon, DatabaseIcon, WrenchIcon } from '@phosphor-icons/react/dist/ssr';
import { skillGroups } from '@/content/portfolio';
const categoryIcons = [CodeIcon, StackIcon, DatabaseIcon, WrenchIcon];
export default function Skills() {
  return (
    <section id="skills" className="section container" aria-labelledby="skills-title">
      <div className="section-heading">
        <div>
          <p className="eyebrow">My toolkit</p>
          <h2 id="skills-title">The tools behind the work.</h2>
        </div>
        <p>
          Frontend at the center.
          <br />
          An understanding of what connects it.
        </p>
      </div>
      <div className="toolkit-grid">
        {skillGroups.map((group, index) => (
          <article className={`toolkit-card toolkit-${index}`} key={group.name}>
            <div className="toolkit-heading">
              <span className="code-mark" aria-hidden="true">
                {(() => {
                  const Icon = categoryIcons[index];
                  return <Icon size={24} />;
                })()}
              </span>
              {index === 0 && <span className="focus-badge">Core focus</span>}
            </div>
            <h3>{group.name}</h3>
            <p>{group.description}</p>
            <ul className="toolkit-tags" aria-label={`${group.name} technologies`}>
              {group.items.map((skill) => (
                <li key={skill}>{skill}</li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </section>
  );
}
