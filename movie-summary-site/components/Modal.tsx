'use client';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function Modal({ children, isFallback = false }: { children: React.ReactNode, isFallback?: boolean }) {
  const router = useRouter();

  const onDismiss = () => {
    if (isFallback) {
      router.push('/');
    } else {
      router.back();
    }
  };

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  return (
    <div className="modal-backdrop" onClick={onDismiss} style={isFallback ? { background: 'var(--bg-color)' } : {}}>
      <div className="modal-content movie-modal" onClick={(e) => e.stopPropagation()}>
        <button className="close-btn" onClick={onDismiss}><i className="fa-solid fa-times"></i></button>
        {children}
      </div>
    </div>
  );
}
