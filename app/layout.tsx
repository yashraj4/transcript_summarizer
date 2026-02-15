import type { Metadata } from 'next';
import Link from 'next/link';
import './globals.css';

export const metadata: Metadata = {
  title: 'Transcript Summarizer',
  description: 'Automate your text processing workflows effortlessly.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: 'var(--background)' }}>
          <header style={{ width: '100%', borderBottom: '1px solid var(--card-border)', backgroundColor: 'var(--card-bg)' }}>
            <div className="container" style={{ padding: '1.25rem 0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
              <Link href="/" style={{ fontSize: '1.5rem', fontWeight: '700', color: 'var(--foreground)', letterSpacing: '-0.02em', textDecoration: 'none', marginRight: 'auto' }}>
                Transcript Summarizer
              </Link>
              <nav style={{ marginLeft: 'auto' }}>
                <Link href="/history" className="btn btn-secondary" style={{ fontSize: '0.9rem', fontWeight: 500 }}>History</Link>
              </nav>
            </div>
          </header>

          <main className="container" style={{ flex: 1, padding: '2rem 1.5rem' }}>
            {children}
          </main>

          <footer style={{ textAlign: 'center', padding: '2rem', borderTop: '1px solid var(--card-border)', color: 'var(--text-muted)', fontSize: '0.875rem' }}>
            <p>© {new Date().getFullYear()} Transcript Summarizer. All rights reserved.</p>
          </footer>
        </div>
      </body>
    </html>
  );
}
