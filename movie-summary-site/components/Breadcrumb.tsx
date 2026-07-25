import Link from 'next/link';

export interface BreadcrumbItem {
  name: string;
  url: string;
}

export default function Breadcrumb({ items }: { items: BreadcrumbItem[] }) {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.koremiyo.com';

  const schemaData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.url.startsWith('http') ? item.url : `${baseUrl}${item.url.startsWith('/') ? '' : '/'}${item.url}`
    }))
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />
      <nav 
        aria-label="Breadcrumb" 
        style={{
          padding: '0.6rem 1.2rem',
          margin: '0.5rem 0 1.5rem 0',
          background: 'rgba(255, 255, 255, 0.04)',
          backdropFilter: 'blur(10px)',
          borderRadius: '20px',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          fontSize: '0.85rem',
          color: 'var(--text-secondary, #a0a0a0)',
          overflowX: 'auto',
          whiteSpace: 'nowrap',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          width: 'fit-content',
          maxWidth: '100%'
        }}
      >
        {items.map((item, index) => {
          const isLast = index === items.length - 1;

          return (
            <div key={index} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
              {index > 0 && (
                <i className="fa-solid fa-chevron-right" style={{ fontSize: '0.7rem', opacity: 0.5 }}></i>
              )}
              {isLast ? (
                <span style={{ color: 'var(--text-primary, #ffffff)', fontWeight: 600, overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '250px', display: 'inline-block', verticalAlign: 'bottom' }}>
                  {item.name}
                </span>
              ) : (
                <Link 
                  href={item.url} 
                  style={{ 
                    color: 'var(--accent-color, #00e5ff)', 
                    textDecoration: 'none', 
                    transition: 'opacity 0.2s ease',
                    fontWeight: 500
                  }}
                >
                  {index === 0 ? (
                    <><i className="fa-solid fa-house" style={{ marginRight: '0.3rem' }}></i>{item.name}</>
                  ) : (
                    item.name
                  )}
                </Link>
              )}
            </div>
          );
        })}
      </nav>
    </>
  );
}
