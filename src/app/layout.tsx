import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Datasheet Generator',
  description: 'Generate professional industrial datasheets',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
