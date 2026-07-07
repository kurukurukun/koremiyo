import Link from 'next/link';

export default function Logo() {
  return (
    <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', textDecoration: 'none' }}>
      <span className="fa-stack" style={{ fontSize: '0.8em', marginRight: '-0.2rem', transform: 'translateY(-2px)' }}>
        <i className="fa-solid fa-ticket fa-stack-2x" style={{ color: 'var(--primary-color)', transform: 'rotate(-15deg)' }}></i>
        <i className="fa-solid fa-check fa-stack-1x" style={{ color: 'var(--bg-color)', transform: 'rotate(-15deg) scale(1.3)', fontWeight: 900 }}></i>
      </span>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'center', lineHeight: 1.1 }}>
        <span style={{ color: 'var(--text-primary)', fontSize: '1.2rem', fontWeight: 800, letterSpacing: '0.5px', whiteSpace: 'nowrap' }}>KOREMIYO</span>
        <div className="logo-subtext">
          <span style={{ fontSize: '0.7rem', fontWeight: 700, color: 'var(--primary-color)', letterSpacing: '0.5px' }}>コレミヨ</span>
          <span className="slogan" style={{ fontSize: '0.65rem', color: 'var(--text-secondary)', fontWeight: 400 }}>〜今日の映画選びを絶対に外さない〜</span>
        </div>
      </div>
    </Link>
  );
}
