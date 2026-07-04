import QuickPick from '@/components/QuickPick';
import Logo from '@/components/Logo';
import HamburgerMenu from '@/components/HamburgerMenu';

export const metadata = {
  title: '今日の映画を探す | KOREMIYO',
  description: '今の気分と時間を選ぶだけで、あなたにピッタリの映画を10秒で提案します。',
};

export default function QuickPickPage() {
  return (
    <>
      <header className="scrolled">
        <div className="logo" style={{ cursor: 'pointer' }}>
          <Logo />
        </div>
        <HamburgerMenu />
      </header>

      <main style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '6rem 1rem 2rem' }}>
        <div style={{ width: '100%', maxWidth: '800px' }}>
          <QuickPick />
        </div>
      </main>
    </>
  );
}
