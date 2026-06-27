'use client';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function Modal({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  const onDismiss = () => {
    router.back();
  };

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  return (
    <div className="modal-backdrop" onClick={onDismiss}>
      <div className="modal-content movie-modal" onClick={(e) => e.stopPropagation()}>
        <button className="close-btn" onClick={onDismiss}><i className="fa-solid fa-times"></i></button>
        {children}
      </div>
    </div>
  );
}
