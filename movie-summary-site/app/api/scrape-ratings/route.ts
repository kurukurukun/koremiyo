import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const title = searchParams.get('title');

  if (!title) {
    return NextResponse.json({ error: 'Title is required' }, { status: 400 });
  }

  let filmarksScore = '?.?';
  let eigaScore = '?.?';

  try {
    // Filmarks
    const filmarksRes = await fetch(`https://filmarks.com/search/movies?q=${encodeURIComponent(title)}`, {
      headers: { 'User-Agent': 'Mozilla/5.0' },
      next: { revalidate: 86400 } // Cache for 24 hours
    });
    const filmarksHtml = await filmarksRes.text();
    const filmarksMatch = filmarksHtml.match(/c-rating__score[^>]*>([\d\.]+)<\/div>/);
    if (filmarksMatch) {
      filmarksScore = filmarksMatch[1];
    }

    // Eiga.com
    const eigaRes = await fetch(`https://eiga.com/search/${encodeURIComponent(title)}/`, {
      headers: { 'User-Agent': 'Mozilla/5.0' },
      next: { revalidate: 86400 } // Cache for 24 hours
    });
    const eigaHtml = await eigaRes.text();
    let eigaMatch = eigaHtml.match(/class="rating-star val\d* small">([\d\.]+)</);
    if (!eigaMatch) {
      eigaMatch = eigaHtml.match(/data-rating="([\d\.]+)"/);
    }
    if (eigaMatch) {
      eigaScore = eigaMatch[1];
    }

  } catch (error) {
    console.error('Scraping error:', error);
  }

  return NextResponse.json({ eigaScore, filmarksScore });
}
