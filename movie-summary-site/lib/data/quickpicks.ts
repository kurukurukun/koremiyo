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

  // --- 感情を揺さぶられたい (Emotional/Drama) ---
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
    description: "夢を追う二人の切なくも美しいミュージカル。ラストは涙腺崩壊。"
  },
  {
    title: "タイタニック",
    year: 1997,
    timeCategory: '150',
    mood: 'emotional',
    description: "映画史に残る永遠の愛。長尺を全く感じさせない没入感があります。"
  },
  {
    title: "インターステラー",
    year: 2014,
    timeCategory: '150',
    mood: 'emotional',
    description: "宇宙と時間、そして親子の愛。見終わった後の余韻が凄まじいです。"
  },

  // --- 何も考えたくない (Relaxing/Comedy/Pop) ---
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
  {
    title: "ウルフ・オブ・ウォールストリート",
    year: 2013,
    timeCategory: '150',
    mood: 'relaxing',
    description: "ぶっ飛んだ金持ちの狂乱。長さを感じさせないテンポの良いコメディです。"
  }
];
