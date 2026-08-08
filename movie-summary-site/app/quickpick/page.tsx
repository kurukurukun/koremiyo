import QuickPick from '@/components/QuickPick';
import Logo from '@/components/Logo';
import HamburgerMenu from '@/components/HamburgerMenu';
import Breadcrumb from '@/components/Breadcrumb';
import Link from 'next/link';

export const metadata = {
  title: '今日の映画を探す | KOREMIYO',
  description: '今の気分と時間を選ぶだけで、あなたにピッタリの映画を10秒で提案します。',
  alternates: {
    canonical: 'https://www.koremiyo.com/quickpick',
  },
  openGraph: {
    title: '今日の映画を探す | KOREMIYO',
    description: '今の気分と時間を選ぶだけで、あなたにピッタリの映画を10秒で提案します。',
    url: 'https://www.koremiyo.com/quickpick',
  }
};

export default function QuickPickPage() {
  const breadcrumbItems = [
    { name: 'ホーム', url: '/' },
    { name: '今日の映画を探す', url: '/quickpick' }
  ];

  return (
    <>
      <header className="scrolled">
        <div className="logo" style={{ cursor: 'pointer' }}>
          <Link href="/">
            <Logo />
          </Link>
        </div>
        <HamburgerMenu />
      </header>

      <main style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '6rem 1rem 2rem' }}>
        <div style={{ width: '100%', maxWidth: '800px' }}>
          <Breadcrumb items={breadcrumbItems} />
          <QuickPick />
        </div>
      </main>
    </>
  );
}
