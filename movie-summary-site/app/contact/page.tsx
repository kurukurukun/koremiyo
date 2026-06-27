'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Metadata } from 'next';

export default function ContactPage() {
  const [result, setResult] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus('loading');
    setResult('送信中...');
    
    const formData = new FormData(event.currentTarget);
    // Web3Forms用のアクセスキー（環境変数、または直接文字列を指定）
    const accessKey = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY || 'YOUR_ACCESS_KEY_HERE';
    formData.append('access_key', accessKey);

    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData
      });

      const data = await res.json();

      if (data.success) {
        setStatus('success');
        setResult('メッセージが送信されました。ご意見ありがとうございます！');
        (event.target as HTMLFormElement).reset();
      } else {
        console.log('Error', data);
        setStatus('error');
        setResult('エラーが発生しました: ' + data.message);
      }
    } catch (error) {
      console.log('Error', error);
      setStatus('error');
      setResult('通信エラーが発生しました。時間をおいて再度お試しください。');
    }
  };

  return (
    <>
      <header className="scrolled">
        <Link href="/" style={{ textDecoration: 'none' }}>
          <div className="logo" style={{ display: 'flex', alignItems: 'baseline', gap: '0.5rem' }}>
            <span className="fa-stack" style={{ fontSize: '0.65em', marginRight: '-0.1rem', transform: 'translateY(-2px)' }}>
              <i className="fa-solid fa-ticket fa-stack-2x" style={{ color: 'var(--primary-color)', transform: 'rotate(-15deg)' }}></i>
              <i className="fa-solid fa-check fa-stack-1x" style={{ color: 'var(--bg-color)', transform: 'rotate(-15deg) scale(1.3)', fontWeight: 900 }}></i>
            </span>
            <span style={{ color: 'var(--text-primary)' }}>KOREMIYO</span>
          </div>
        </Link>
      </header>
      
      <main style={{ paddingTop: '100px', minHeight: '100vh', paddingBottom: '4rem', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <div className="contact-container">
          <div className="contact-header">
            <h1>お問い合わせ</h1>
            <p>サイトに関するご意見・ご要望や、「こんな映画をまとめてほしい」などのリクエストをお気軽にお送りください。</p>
          </div>
          
          <form onSubmit={onSubmit} className="contact-form">
            <div className="form-group">
              <label htmlFor="name">お名前 (任意)</label>
              <input type="text" name="name" id="name" placeholder="映画 太郎" />
            </div>
            
            <div className="form-group">
              <label htmlFor="email">メールアドレス (任意)</label>
              <input type="email" name="email" id="email" placeholder="koremiyo@example.com" />
              <small>返信をご希望の場合はご記入ください。</small>
            </div>
            
            <div className="form-group">
              <label htmlFor="message">メッセージ <span className="required">*</span></label>
              <textarea name="message" id="message" rows={6} placeholder="ここにご意見やリクエストをご記入ください。" required></textarea>
            </div>
            
            <button type="submit" className={`submit-btn ${status}`} disabled={status === 'loading'}>
              {status === 'loading' ? '送信中...' : 'メッセージを送信する'}
            </button>
            
            {result && (
              <div className={`form-result ${status}`}>
                {result}
              </div>
            )}
          </form>
          
          <div style={{ marginTop: '2rem', textAlign: 'center' }}>
            <Link href="/" className="back-link" style={{ color: 'var(--text-secondary)' }}>
              <i className="fa-solid fa-arrow-left"></i> トップページに戻る
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}
