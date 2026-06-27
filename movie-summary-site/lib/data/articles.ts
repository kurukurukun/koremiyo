export interface Article {
  id: string;
  title: string;
  date: string;
  description: string;
  contentHtml: string;
  movieQueries: { title: string; year?: number; searchQuery?: string }[];
}

export const articles: Article[] = [
  {
    id: 'mind-blowing-endings',
    title: '【ネタバレ厳禁】ラストのどんでん返しが凄い映画5選',
    date: '2026-06-27',
    description: '見終わった後に「やられた！」と叫びたくなる、衝撃のラストを迎える名作映画を厳選してご紹介します。',
    contentHtml: `
      <p>映画の醍醐味といえば、なんといっても予想を裏切られるストーリー展開ですよね。</p>
      <p>今回は、世界中の映画ファンを驚かせた「どんでん返し」が素晴らしい映画をピックアップしました。未見の方は絶対にネタバレを見ずに鑑賞することをおすすめします！</p>
    `,
    movieQueries: [
      { title: "シックス・センス", year: 1999 },
      { title: "ユージュアル・サスペクツ", year: 1995 },
      { title: "セブン", year: 1995, searchQuery: "Se7en" },
      { title: "ファイト・クラブ", year: 1999 },
      { title: "シャッター アイランド", year: 2010 }
    ]
  },
  {
    id: 'must-watch-korean-movies',
    title: '圧倒的熱量！絶対に観るべき韓国映画の傑作まとめ',
    date: '2026-06-26',
    description: '世界を席巻する韓国映画。サスペンスからヒューマンドラマまで、その圧倒的なクオリティと熱量を感じられる必見の傑作を紹介します。',
    contentHtml: `
      <p>近年、アカデミー賞を受賞するなど世界的な評価を高め続けている韓国映画。</p>
      <p>その魅力は、容赦ない描写と骨太なストーリーテリング、そして俳優陣の圧倒的な演技力にあります。ここでは、韓国映画初心者にも、映画通にもおすすめしたい傑作をまとめました。</p>
    `,
    movieQueries: [
      { title: "パラサイト 半地下の家族", year: 2019 },
      { title: "オールド・ボーイ", year: 2003, searchQuery: "Oldboy" },
      { title: "殺人の追憶", year: 2003 },
      { title: "新感染 ファイナル・エクスプレス", year: 2016, searchQuery: "Train to Busan" }
    ]
  }
];
