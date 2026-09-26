import StarField from '@/components/star-field';
import ThemeSwitch from '@/components/theme-switch';
import Hero from '@/components/sections/hero';
import Projects from '@/components/sections/projects';
import About from '@/components/sections/about';
import Experience from '@/components/sections/experience';
import Skills from '@/components/sections/skills';
import Contact from '@/components/sections/contact';
import { profile } from '@/content/portfolio';
import { getSiteUrl, serializeJsonLd } from '@/lib/site';
export default function Home() {
  const url = getSiteUrl();
  return (
    <main id="main" tabIndex={-1}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: serializeJsonLd({
            '@context': 'https://schema.org',
            '@type': 'Person',
            name: profile.name,
            ...(url ? { url: url.href } : {}),
            sameAs: profile.socials.map((social) => social.url),
            jobTitle: 'Software Developer',
          }),
        }}
      />
      <StarField />
      <ThemeSwitch className="sky-control" />
      <Hero />
      <Projects />
      <About />
      <Experience />
      <Skills />
      <Contact />
    </main>
  );
}
