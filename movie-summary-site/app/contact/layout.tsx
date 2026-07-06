import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'お問い合わせ | KOREMIYO',
  description: 'KOREMIYOへのお問い合わせページです。',
  robots: {
    index: false,
    follow: false,
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
