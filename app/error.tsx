'use client';
export default function ErrorPage({ reset }: { reset: () => void }) {
  return (
    <main className="container error-page">
      <h1>Something went wrong.</h1>
      <p>Please try loading the page again.</p>
      <button className="button button-primary" onClick={reset}>
        Try again
      </button>
    </main>
  );
}
