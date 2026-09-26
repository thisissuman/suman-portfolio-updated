import { profile } from '@/content/portfolio';
export default function Footer() {
  return (
    <footer className="container footer">
      <a className="wordmark" href="#home">
        suman<span>.</span>
      </a>
      <p>
        © {new Date().getFullYear()} {profile.name}
      </p>
      <p>Made with Next.js & a little attention to detail.</p>
      <a href="#home">
        Back to top <span aria-hidden="true">↑</span>
      </a>
    </footer>
  );
}
