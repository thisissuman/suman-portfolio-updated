'use client';
import { useEffect, useState } from 'react';
import { navigation } from '@/content/portfolio';

export default function Header() {
  const [active, setActive] = useState<string>('home');
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) if (entry.isIntersecting) setActive(entry.target.id);
      },
      { rootMargin: '-15% 0px -65% 0px', threshold: 0 },
    );
    for (const { id } of navigation) {
      const section = document.getElementById(id);
      if (section) observer.observe(section);
    }
    return () => observer.disconnect();
  }, []);
  return (
    <header className="site-header">
      <div className="header-inner container">
        <a className="wordmark" href="#home" aria-label="Suman, home">
          suman<span aria-hidden="true">.</span>
        </a>
        <nav aria-label="Main navigation">
          <ul>
            {navigation
              .filter((link) => link.id !== 'home')
              .map((link) => (
                <li key={link.id}>
                  <a
                    href={`#${link.id}`}
                    aria-current={active === link.id ? 'location' : undefined}
                    onClick={() => setActive(link.id)}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
