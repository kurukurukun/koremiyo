'use client';

import { useState } from 'react';

export interface MovieFAQProps {
  movie: any;
  jpProviders?: any[] | null;
  isAmazonAvailable?: boolean;
}

export default function MovieFAQ({ movie, jpProviders, isAmazonAvailable }: MovieFAQProps) {
  const [openIndexes, setOpenIndexes] = useState<number[]>([0]); // First FAQ open by default

  if (!movie || !movie.title) return null;

  const title = movie.title;
  const releaseYear = movie.release_date ? movie.release_date.split('-')[0] : '';
  const voteAverage = movie.vote_average ? movie.vote_average.toFixed(1) : null;
  
  // Extract directors & main cast
  const directors = movie.credits?.crew?.filter((c: any) => c.job === 'Director').map((d: any) => d.name) || [];
  const topCast = movie.credits?.cast?.slice(0, 4).map((a: any) => a.name) || [];
  const providerNames = jpProviders && jpProviders.length > 0 
    ? jpProviders.map((p: any) => p.provider_name).join('、')
    : null;

  // Generate dynamic FAQs
  const faqs = [
    {
      question: `映画『${title}』はAmazonプライム・ビデオやU-NEXTで見放題配信されていますか？`,
      answer: providerNames 
        ? `はい。日本国内では【${providerNames}】などの定額見放題（サブスク）サービスで配信されています。${isAmazonAvailable ? 'Amazonプライム・ビデオでもお楽しみいただけます。' : ''}`
        : isAmazonAvailable
        ? `Amazonプライム・ビデオにて配信・レンタルが確認されています。最新の定額見放題・レンタル状況は各配信サイトをご確認ください。`
        : `定額見放題（サブスク）やレンタル配信状況は時期により更新されます。Amazonプライム・ビデオやU-NEXTなどの最新配信情報は作品詳細の配信アイコンからご確認いただけます。`
    },
    {
      question: `映画『${title}』の評価スコアや見どころは？`,
      answer: `${title}${releaseYear ? `（${releaseYear}年公開）` : ''}は、${voteAverage ? `TMDBユーザー評価で【★ ${voteAverage} / 10】の高スコアを獲得している名作です。` : '世界中で高い評価を受けている注目の映画作品です。'}${movie.overview ? `あらすじ: 「${movie.overview.slice(0, 100)}...」` : ''}`
    },
    {
      question: `映画『${title}』の監督や主なキャスト（出演者）は誰ですか？`,
      answer: `監督は${directors.length > 0 ? directors.join('、') : '新鋭の監督'}が務めています。主な出演キャストには${topCast.length > 0 ? topCast.join('、') : '実力派俳優陣'}などが名を連ねています。`
    }
  ];

  const toggleFAQ = (index: number) => {
    if (openIndexes.includes(index)) {
      setOpenIndexes(openIndexes.filter(i => i !== index));
    } else {
      setOpenIndexes([...openIndexes, index]);
    }
  };

  const schemaData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };

  return (
    <div style={{ marginTop: '2.5rem', marginBottom: '1.5rem' }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />
      <h3 style={{ 
        fontSize: '1.2rem', 
        fontWeight: 700, 
        color: 'var(--primary-color, #ffffff)', 
        marginBottom: '1rem',
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem'
      }}>
        <i className="fa-solid fa-circle-question" style={{ color: 'var(--accent-color, #00e5ff)' }}></i> 
        『{title}』のよくある質問 (FAQ)
      </h3>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
        {faqs.map((faq, idx) => {
          const isOpen = openIndexes.includes(idx);
          return (
            <div 
              key={idx}
              style={{
                background: 'rgba(255, 255, 255, 0.03)',
                borderRadius: '12px',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                overflow: 'hidden',
                transition: 'all 0.2s ease'
              }}
            >
              <button
                onClick={() => toggleFAQ(idx)}
                style={{
                  width: '100%',
                  padding: '1rem 1.2rem',
                  background: 'none',
                  border: 'none',
                  color: 'var(--text-primary, #ffffff)',
                  textAlign: 'left',
                  fontSize: '0.95rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  gap: '1rem'
                }}
                aria-expanded={isOpen}
              >
                <span>Q. {faq.question}</span>
                <i className={`fa-solid ${isOpen ? 'fa-chevron-up' : 'fa-chevron-down'}`} style={{ fontSize: '0.8rem', color: 'var(--accent-color, #00e5ff)' }}></i>
              </button>

              {isOpen && (
                <div style={{ 
                  padding: '0 1.2rem 1rem 1.2rem', 
                  fontSize: '0.9rem', 
                  lineHeight: 1.6, 
                  color: 'var(--text-secondary, #cccccc)',
                  borderTop: '1px solid rgba(255, 255, 255, 0.04)',
                  paddingTop: '0.8rem'
                }}>
                  {faq.answer}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
