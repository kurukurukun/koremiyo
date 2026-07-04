export type TimeCategory = '90' | '120' | '150';
export type MoodCategory = 'exciting' | 'emotional' | 'relaxing';

export interface QuickPickMovie {
  title: string;
  searchQuery?: string;
  year?: number;
  timeCategory: TimeCategory;
  mood: MoodCategory;
  description: string;
}

export const quickPicks: QuickPickMovie[] = [
  // --- パキッとしたい (Exciting/Action/Thriller) ---
  // 90
  {
    title: "ゼロ・グラビティ",
    year: 2013,
    timeCategory: '90',
    mood: 'exciting',
    description: "宇宙空間に放り出される究極のパニック。90分間息をつく暇もありません。"
  },
  {
    title: "セッション",
    year: 2014,
    timeCategory: '90',
    mood: 'exciting',
    description: "狂気のジャズレッスン。ラストの演奏シーンは瞬き厳禁の没入感です。"
  },
  {
    title: "クワイエット・プレイス",
    year: 2018,
    timeCategory: '90',
    mood: 'exciting',
    description: "音を立てたら即死。極限の緊張感が続く、新感覚のサバイバルホラー。"
  },
  // 120
  {
    title: "マッドマックス 怒りのデス・ロード",
    year: 2015,
    timeCategory: '120',
    mood: 'exciting',
    description: "開始直後からトップギア。アドレナリン全開の爆走アクション！"
  },
  {
    title: "パラサイト 半地下の家族",
    year: 2019,
    timeCategory: '120',
    mood: 'exciting',
    description: "アカデミー賞作品賞。中盤からの予測不能な展開に釘付けになります。"
  },
  {
    title: "トップガン マーヴェリック",
    year: 2022,
    timeCategory: '120',
    mood: 'exciting',
    description: "全てが最高。胸熱の展開と大迫力のドッグファイトで大興奮間違いなし。"
  },
  // 150
  {
    title: "ダークナイト",
    year: 2008,
    timeCategory: '150',
    mood: 'exciting',
    description: "最凶の悪役ジョーカーが登場する、アメコミ映画の枠を超えた傑作。"
  },
  {
    title: "インセプション",
    year: 2010,
    timeCategory: '150',
    mood: 'exciting',
    description: "夢の中の夢へ潜入。圧倒的な映像美と知的興奮が味わえます。"
  },
  {
    title: "グラディエーター",
    year: 2000,
    timeCategory: '150',
    mood: 'exciting',
    description: "ローマ帝国を舞台にした復讐と誇りの大スペクタクル。魂が震えます。"
  },

  // --- 感情を揺さぶられたい (Emotional/Drama) ---
  // 90
  {
    title: "スタンド・バイ・ミー",
    year: 1986,
    timeCategory: '90',
    mood: 'emotional',
    description: "少年たちのひと夏の冒険。短時間でノスタルジーと感動に浸れます。"
  },
  {
    title: "マイ・ガール",
    year: 1991,
    timeCategory: '90',
    mood: 'emotional',
    description: "初恋と成長の物語。純粋な感情を呼び覚ましてくれる名作です。"
  },
  {
    title: "リメンバー・ミー",
    year: 2017,
    timeCategory: '90',
    mood: 'emotional',
    description: "家族の絆と音楽が織りなす感動のピクサー作品。ラストは涙腺崩壊。"
  },
  // 120
  {
    title: "コーダ あいのうた",
    year: 2021,
    timeCategory: '120',
    mood: 'emotional',
    description: "家族の愛と自立を描く感動作。笑って泣ける大傑作です。"
  },
  {
    title: "ラ・ラ・ランド",
    year: 2016,
    timeCategory: '120',
    mood: 'emotional',
    description: "夢を追う二人の切なくも美しいミュージカル。ラストは涙が止まりません。"
  },
  {
    title: "ライフ・イズ・ビューティフル",
    year: 1997,
    timeCategory: '120',
    mood: 'emotional',
    description: "絶望の中でもユーモアと愛を忘れない、映画史に残る感動作。"
  },
  // 150
  {
    title: "タイタニック",
    year: 1997,
    timeCategory: '150',
    mood: 'emotional',
    description: "映画史に残る永遠の愛。長尺を全く感じさせない圧倒的な没入感があります。"
  },
  {
    title: "インターステラー",
    year: 2014,
    timeCategory: '150',
    mood: 'emotional',
    description: "宇宙と時間、そして親子の愛。見終わった後の余韻が凄まじいSF巨編。"
  },
  {
    title: "レ・ミゼラブル",
    year: 2012,
    timeCategory: '150',
    mood: 'emotional',
    description: "愛と信念を貫く人々の姿に魂が震える、ミュージカル映画の金字塔。"
  },

  // --- 何も考えたくない (Relaxing/Comedy/Pop) ---
  // 90
  {
    title: "ハングオーバー! 消えた花ムコと史上最悪の二日酔い",
    searchQuery: "ハングオーバー",
    year: 2009,
    timeCategory: '90',
    mood: 'relaxing',
    description: "究極のバカ騒ぎ。頭を空っぽにして爆笑したい夜に最適。"
  },
  {
    title: "ホーム・アローン",
    year: 1990,
    timeCategory: '90',
    mood: 'relaxing',
    description: "痛快ドタバタコメディ。何度見てもスッキリできる定番中の定番。"
  },
  {
    title: "テッド",
    year: 2012,
    timeCategory: '90',
    mood: 'relaxing',
    description: "見た目は可愛いクマ、中身は下品なおっさん。何も考えずに笑えます。"
  },
  // 120
  {
    title: "バック・トゥ・ザ・フューチャー",
    year: 1985,
    timeCategory: '120',
    mood: 'relaxing',
    description: "エンタメ映画の最高峰。ワクワクだけが詰まった116分です。"
  },
  {
    title: "最強のふたり",
    year: 2011,
    timeCategory: '120',
    mood: 'relaxing',
    description: "実話ベースのハートフルコメディ。心温まる最高のバディムービー。"
  },
  {
    title: "オーシャンズ11",
    year: 2001,
    timeCategory: '120',
    mood: 'relaxing',
    description: "超豪華キャストがおくるお洒落で痛快な泥棒エンターテイメント。"
  },
  // 150
  {
    title: "ウルフ・オブ・ウォールストリート",
    year: 2013,
    timeCategory: '150',
    mood: 'relaxing',
    description: "ぶっ飛んだ金持ちの狂乱。長さを感じさせないテンポの良いコメディです。"
  },
  {
    title: "きっと、うまくいく",
    year: 2009,
    timeCategory: '150',
    mood: 'relaxing',
    description: "笑って泣いて、最後は最高にスカッとする。インド映画の超名作。"
  },
  {
    title: "ワンス・アポン・ア・タイム・イン・ハリウッド",
    year: 2019,
    timeCategory: '150',
    mood: 'relaxing',
    description: "ハリウッド黄金期への愛に溢れた作品。最高にリラックスして楽しめます。"
  }
];
