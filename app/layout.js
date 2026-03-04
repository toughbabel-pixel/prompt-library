import './globals.css';

export const metadata = {
  title: 'Prompt Library Builder',
  description: 'Save, organize, and reuse AI prompts quickly.'
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
