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
  {
    title: "ワン・バトル・アフター・アナザー",
    year: 2025,
    timeCategory: '150',
    mood: 'exciting',
    description: "元革命家の頼りない中年男ボブ。彼はさらわれた愛娘を取り戻すため、かつての仲間や謎めいた空手のセンセイ..."
  },
  {
    title: "ANORA アノーラ",
    year: 2024,
    timeCategory: '150',
    mood: 'relaxing',
    description: "第77回カンヌ国際映画祭でパルム・ドール、第97回アカデミー賞では作品、監督、主演女優、脚本、編集の..."
  },
  {
    title: "オッペンハイマー",
    year: 2023,
    timeCategory: '150',
    mood: 'emotional',
    description: "第2次世界大戦中、才能にあふれた物理学者のロバート・オッペンハイマーは、核開発を急ぐ米政府のマンハッ..."
  },
  {
    title: "エブリシング・エブリウェア・オール・アット・ワンス",
    year: 2022,
    timeCategory: '150',
    mood: 'exciting',
    description: "経営するコインランドリーの税金問題、父親の介護に反抗期の娘、優しいだけで頼りにならない夫と、盛りだく..."
  },
  {
    title: "コーダ あいのうた",
    year: 2021,
    timeCategory: '120',
    mood: 'relaxing',
    description: "耳が聞こえない家族の中で1人だけ耳が聞こえるルビーは、幼い頃から家族の耳となり、通訳係として家業の漁..."
  },
  {
    title: "ノマドランド",
    year: 2020,
    timeCategory: '120',
    mood: 'emotional',
    description: "現代のノマド（遊牧民）として車上生活を送る女性が、出会う人々と交流し、困難な時代を乗り越えながら、自..."
  },
  {
    title: "パラサイト 半地下の家族",
    year: 2019,
    timeCategory: '120',
    mood: 'exciting',
    description: "過去に度々事業に失敗、計画性も仕事もないが楽天的な父キム・ギテク。そんな甲斐性なしの夫に強くあたる母..."
  },
  {
    title: "グリーンブック",
    year: 2018,
    timeCategory: '120',
    mood: 'relaxing',
    description: "人種差別が色濃く残る1960年代のアメリカ南部を舞台に、黒人ジャズピアニストとイタリア系白人運転手の..."
  },
  {
    title: "シェイプ・オブ・ウォーター",
    year: 2017,
    timeCategory: '120',
    mood: 'emotional',
    description: "1962年、米ソ冷戦時代のアメリカで、政府の極秘研究所の清掃員として働く孤独なイライザは、同僚のゼル..."
  },
  {
    title: "ムーンライト",
    year: 2016,
    timeCategory: '120',
    mood: 'emotional',
    description: "マイアミを舞台に自分の居場所とアイデンティティを模索する少年の成長を、少年期、ティーンエイジャー期、..."
  },
  {
    title: "スポットライト 世紀のスクープ",
    year: 2015,
    timeCategory: '120',
    mood: 'emotional',
    description: "2002年、ウォルターやマイクたちのチームは、「The Boston Globe」で連載コーナーを担..."
  },
  {
    title: "バードマン あるいは（無知がもたらす予期せぬ奇跡）",
    year: 2014,
    timeCategory: '120',
    mood: 'relaxing',
    description: "かつてヒーロー映画「バードマン」で一世を風靡した俳優リーガン・トムソンは、落ちぶれた今、自分が脚色を..."
  },
  {
    title: "それでも夜は明ける",
    year: 2013,
    timeCategory: '120',
    mood: 'emotional',
    description: "1841年、ニューヨーク州サラトガのソロモン・ノーサップは自由黒人のヴァイオリニストだった。彼は妻と..."
  },
  {
    title: "アルゴ",
    year: 2012,
    timeCategory: '120',
    mood: 'exciting',
    description: "1979年11月4日、テヘラン。イラン革命が激しさを募らせ、その果てにアメリカ大使館を過激派グループ..."
  },
  {
    title: "アーティスト",
    year: 2011,
    timeCategory: '90',
    mood: 'relaxing',
    description: "サイレントからトーキーへと移り変わるころのハリウッドを舞台に、スター俳優の葛藤と愛を美しいモノクロ映..."
  },
  {
    title: "英国王のスピーチ",
    year: 2010,
    timeCategory: '120',
    mood: 'emotional',
    description: "ジョージ6世(コリン・ファース)は、幼い頃から吃音というコンプレックスを抱えていたため、英国王ジョー..."
  },
  {
    title: "ハート・ロッカー",
    year: 2009,
    timeCategory: '120',
    mood: 'exciting',
    description: "2004年夏、イラク・バグダッド郊外。アメリカ軍爆発物処理班・ブラボー中隊のリーダーに、ウィリアム・..."
  },
  {
    title: "スラムドッグ$ミリオネア",
    year: 2008,
    timeCategory: '120',
    mood: 'emotional',
    description: "テレビ番組「クイズ＄ミリオネア」に出演し、賞金を獲得したジャマールだったが、インドのスラム街で育った..."
  },
  {
    title: "ノーカントリー",
    year: 2007,
    timeCategory: '120',
    mood: 'exciting',
    description: "狩りをしていたルウェリンは、死体の山に囲まれた大量のヘロインと200万ドルの大金を発見する。危険なに..."
  },
  {
    title: "ディパーテッド",
    year: 2006,
    timeCategory: '150',
    mood: 'exciting',
    description: "香港映画『インファナル・アフェア』をマーティン・スコセッシがボストンに舞台を変えハリウッドでリメイク..."
  },
  {
    title: "クラッシュ",
    year: 2005,
    timeCategory: '120',
    mood: 'emotional',
    description: "クリスマスを間近に控えたロサンジェルス。黒人刑事グラハムとその同僚でヒスパニックの恋人リアは、交通事..."
  },
  {
    title: "ミリオンダラー・ベイビー",
    year: 2004,
    timeCategory: '120',
    mood: 'emotional',
    description: "クリント・イーストウッドが監督・主演を務めた衝撃のヒューマン・ドラマ。厳しいボクシングの世界を題材に..."
  },
  {
    title: "ロード・オブ・ザ・リング/王の帰還",
    year: 2003,
    timeCategory: '150',
    mood: 'exciting',
    description: "昼なお暗いモルドールの山。フロドが眠る隣でゴラムは、彼の“愛しいしと”たる指輪を初めて手に入れたとき..."
  },
  {
    title: "シカゴ",
    year: 2002,
    timeCategory: '120',
    mood: 'exciting',
    description: "1920年代のシカゴ。スターを夢見るロキシーは、キャバレーの専属歌手ヴェルマのステージを羨望の眼差し..."
  },
  {
    title: "ビューティフル・マインド",
    year: 2001,
    timeCategory: '120',
    mood: 'emotional',
    description: "1947年9月、プリンストン大学院の数学科に入学を果たしたジョン・ナッシュ。ひとり研究に没頭するナッ..."
  },
  {
    title: "グラディエーター",
    year: 2000,
    timeCategory: '150',
    mood: 'exciting',
    description: "リドリー・スコット監督が放つスペクタクル活劇。古代ローマ帝国を舞台に、陰謀に陥れられた英雄騎士の死闘..."
  },
  {
    title: "アメリカン・ビューティー",
    year: 1999,
    timeCategory: '120',
    mood: 'emotional',
    description: "40歳を過ぎた広告マンのレスター・バーナムと上昇志向たっぷりの妻キャロリン。彼らの家庭生活に潜む歪ん..."
  },
  {
    title: "恋におちたシェイクスピア",
    year: 1998,
    timeCategory: '120',
    mood: 'relaxing',
    description: "16世紀末のロンドン。スランプに陥っていた劇作家シェイクスピアはオーディションにやって来た一人の若者..."
  },
  {
    title: "タイタニック",
    year: 1997,
    timeCategory: '150',
    mood: 'emotional',
    description: "1912年、処女航海に出た豪華客船タイタニック号。新天地アメリカを目指す画家志望の青年ジャックと上流..."
  },
  {
    title: "イングリッシュ・ペイシェント",
    year: 1996,
    timeCategory: '150',
    mood: 'emotional',
    description: "第２次大戦末期のイタリア。空襲で破壊された修道院でカナダ人看護師ハナは、ある患者の世話をしている。重..."
  },
  {
    title: "ブレイブハート",
    year: 1995,
    timeCategory: '150',
    mood: 'exciting',
    description: "イングランド王の圧制に家族を殺された、スコットランド人のウォーレス。愛する家族の仇を討つため、多くの..."
  },
  {
    title: "フォレスト・ガンプ/一期一会",
    year: 1994,
    timeCategory: '150',
    mood: 'relaxing',
    description: "1940年代、アラバマ州で生まれたフォレスト・ガンプは、知能指数こそ人に劣るが、母親にたっぷりの愛情..."
  },
  {
    title: "シンドラーのリスト",
    year: 1993,
    timeCategory: '150',
    mood: 'emotional',
    description: "1939年、ポーランド南部の都市クラクフにドイツ軍が侵攻した。ドイツ人実業家のオスカー・シンドラーは..."
  },
  {
    title: "許されざる者",
    year: 1992,
    timeCategory: '120',
    mood: 'emotional',
    description: "荒事からは足を洗っていたウィリアム・マニーの元へ若いガンマンが訪れる。娼婦に傷を負わせ賞金をかけられ..."
  },
  {
    title: "羊たちの沈黙",
    year: 1991,
    timeCategory: '120',
    mood: 'exciting',
    description: "若い女性の皮膚を剥ぎ落とし、その死体を川に流すという残忍な連続猟奇殺人が発生した。  犯人の仮称を冠..."
  },
  {
    title: "ダンス・ウィズ・ウルブズ",
    year: 1990,
    timeCategory: '150',
    mood: 'exciting',
    description: "1863年、南北戦争の激戦地。その自殺的行為から英雄となり、殊勲者として勤務地を選ぶ権利を与えられた..."
  },
  {
    title: "ドライビング Miss デイジー",
    year: 1989,
    timeCategory: '90',
    mood: 'emotional',
    description: "1948年、夏。長年勤めた教職を退いたデイジーは未亡人。まだまだ元気いっぱいの彼女だったが、寄る年波..."
  },
  {
    title: "レインマン",
    year: 1988,
    timeCategory: '120',
    mood: 'emotional',
    description: "自由奔放な青年が重度の自閉症の兄と出会って心を開き、忘れていた愛情を取り戻して行く過程を描いた心暖ま..."
  },
  {
    title: "ラストエンペラー",
    year: 1987,
    timeCategory: '150',
    mood: 'emotional',
    description: "1950年。第二次世界大戦の終結による満州国の崩壊と国共内戦の終結により、共産主義国である中華人民共..."
  },
  {
    title: "プラトーン",
    year: 1986,
    timeCategory: '120',
    mood: 'exciting',
    description: "実体験を基に描かれた、O・ストーン監督によるベトナム映画。クリス・テイラーがベトナムにやって来たのは..."
  },
  {
    title: "愛と哀しみの果て",
    year: 1985,
    timeCategory: '150',
    mood: 'emotional',
    description: "20世紀初頭のアフリカを舞台に、愛と冒険に生きたひとりの女の半生を描いた一大ロマンス。スウェーデン貴..."
  },
  {
    title: "アマデウス",
    year: 1984,
    timeCategory: '150',
    mood: 'relaxing',
    description: "天才音楽家モーツァルトの早過ぎた死は、何者かによる暗殺だったのか。“音楽史上最大のミステリー”に迫っ..."
  },
  {
    title: "愛と追憶の日々",
    year: 1983,
    timeCategory: '120',
    mood: 'relaxing',
    description: "1948年、テキサス州ヒューストン。オーロラは自分が産んだ娘をエマと名付ける。夫と死別した後、手塩に..."
  },
  {
    title: "ガンジー",
    year: 1982,
    timeCategory: '150',
    mood: 'emotional',
    description: "南アフリカ、1893年。ただ白人では無いことを理由に一人の青年紳士が列車の一等車から放り出され、この..."
  },
  {
    title: "炎のランナー",
    year: 1981,
    timeCategory: '120',
    mood: 'emotional',
    description: "パリ・オリンピック陸上短距離で祖国イギリスに金メダルをもたらした2人の若者がいた。ユダヤの血をひいて..."
  },
  {
    title: "普通の人々",
    year: 1980,
    timeCategory: '120',
    mood: 'emotional',
    description: "シカゴ郊外の住宅街。弁護士のカルビンは長男をボート事故で失って以来落胆したままの日々を送り、妻のベス..."
  },
  {
    title: "クレイマー、クレイマー",
    year: 1979,
    timeCategory: '90',
    mood: 'emotional',
    description: "ニューヨークのマンハッタン。結婚8年目のサラリーマン、テッド・クレイマーは忙しい毎日を送っているが、..."
  },
  {
    title: "ディア・ハンター",
    year: 1978,
    timeCategory: '150',
    mood: 'emotional',
    description: "ペンシルベニア州で育ったマイケル、ニック、スティーヴンは、鹿狩りを楽しむ普通の若者であった。3人は戦..."
  },
  {
    title: "アニー・ホール",
    year: 1977,
    timeCategory: '90',
    mood: 'relaxing',
    description: "うだつの上がらないスタンダップ・コメディアン、アルビーは、知り合った美女アニーと意気投合して同棲生活..."
  },
  {
    title: "ロッキー",
    year: 1976,
    timeCategory: '120',
    mood: 'emotional',
    description: "フィラデルフィアの下町。無名ボクサーのロッキーは本業だけでは食えず、借金の取りたてを請け負って日銭を..."
  },
  {
    title: "カッコーの巣の上で",
    year: 1975,
    timeCategory: '120',
    mood: 'emotional',
    description: "原作はベトナム戦争真っただ中の1962年に発表され、ベストセラーになったK・キージーのベストセラー小..."
  },
  {
    title: "ゴッドファーザー PART II",
    year: 1974,
    timeCategory: '150',
    mood: 'exciting',
    description: "亡き父のあとを継ぎドンとなったマイケルの苦悩と復讐を、父ビトーの少年時代からやがて一大ファミリーを築..."
  },
  {
    title: "スティング",
    year: 1973,
    timeCategory: '120',
    mood: 'exciting',
    description: "1936年。シカゴの下町で、詐欺師の3人組が通り掛かりの男をヒッカケて金をだまし取る。しかし彼らが手..."
  },
  {
    title: "ゴッドファーザー",
    year: 1972,
    timeCategory: '150',
    mood: 'exciting',
    description: "シシリーからアメリカに移住し、一代で財を成したドン・コルレオーネ。三男のマイケルはひとり堅気な人生を..."
  },
  {
    title: "フレンチ・コネクション",
    year: 1971,
    timeCategory: '90',
    mood: 'exciting',
    description: "ニューヨーク市警察本部薬物対策課で“ポパイ”とアダ名されるドイル刑事。彼は薬物捜査のベテランだが、捜..."
  },
  {
    title: "パットン大戦車軍団",
    year: 1970,
    timeCategory: '150',
    mood: 'emotional',
    description: "第二次大戦のアフリカ戦線で活躍したアメリカの将軍、ジョージ・パットンを描いた伝記的戦争ドラマ。優れた..."
  },
  {
    title: "真夜中のカーボーイ",
    year: 1969,
    timeCategory: '120',
    mood: 'emotional',
    description: "テキサスの片田舎からニューヨークへやって来たカウボーイ姿の青年ジョーは、自身の肉体と美貌を武器に金持..."
  },
  {
    title: "オリバー!",
    year: 1968,
    timeCategory: '150',
    mood: 'relaxing',
    description: "19世紀のロンドン。貧しい人たちが暮らす施設で母親が亡くなった時に生まれた息子、オリバーは元気のいい..."
  },
  {
    title: "夜の大捜査線",
    year: 1967,
    timeCategory: '120',
    mood: 'exciting',
    description: "南部で発生した殺人事件の容疑者として、駅で列車を待っていた黒人青年ヴァージルの身柄が拘束された。しか..."
  },
  {
    title: "わが命つきるとも",
    year: 1966,
    timeCategory: '120',
    mood: 'emotional',
    description: "16世紀のイギリスを舞台に、権力に屈しなかったトーマス・モアの半生を描いた歴史ドラマ。時の国王ヘンリ..."
  },
  {
    title: "サウンド・オブ・ミュージック",
    year: 1965,
    timeCategory: '150',
    mood: 'relaxing',
    description: "1938年のオーストリア、院長の命により厳格なトラップ家へ家庭教師としてやって来た修道女マリア。彼女..."
  },
  {
    title: "マイ・フェア・レディ",
    year: 1964,
    timeCategory: '150',
    mood: 'relaxing',
    description: "言語学が専門のヒギンズ教授は、同好の士であるピカリング大佐と言葉遣いについて議論した末に、ロンドンの..."
  },
  {
    title: "トム・ジョーンズの華麗な冒険",
    year: 1963,
    timeCategory: '150',
    mood: 'emotional',
    description: ""
  },
  {
    title: "アラビアのロレンス",
    year: 1962,
    timeCategory: '150',
    mood: 'exciting',
    description: "1916年、カイロに赴いている英国陸軍のロレンス少尉は、トルコへの反乱に意気込むアラブ民族の現状を確..."
  },
  {
    title: "ウエスト・サイド物語",
    year: 1961,
    timeCategory: '150',
    mood: 'exciting',
    description: "マンハッタンのウエスト・サイド。イタリア系の若者からなるジェット団と、プエルトリコ系の若者からなるシ..."
  },
  {
    title: "アパートの鍵貸します",
    year: 1960,
    timeCategory: '120',
    mood: 'relaxing',
    description: "1959年、12月。従業員31,259名を擁するニューヨークの保険会社。19階の大部屋に勤める C...."
  },
  {
    title: "ベン・ハー",
    year: 1959,
    timeCategory: '150',
    mood: 'exciting',
    description: "ユダヤの豪族の息子、ベン・ハーの数奇な運命を通してローマの圧政とキリストの最期を6年半の製作期間と5..."
  },
  {
    title: "恋の手ほどき",
    year: 1958,
    timeCategory: '120',
    mood: 'relaxing',
    description: "19世紀、社交界での恋が大ニュースとなっていた頃のお話。社交界の花形になる教育を受けているジジは、な..."
  },
  {
    title: "戦場にかける橋",
    year: 1957,
    timeCategory: '150',
    mood: 'emotional',
    description: "タイとビルマの国境近くにある日本軍の捕虜収容所では捕虜を使って国境に流れるクワイ河に橋を架ける準備が..."
  },
  {
    title: "80日間世界一周",
    year: 1956,
    timeCategory: '150',
    mood: 'exciting',
    description: "時は1872年、まだ飛行機も出現していない時代。イギリスはロンドンの社交クラブで、英国紳士フォッグ氏..."
  },
  {
    title: "マーティ",
    year: 1955,
    searchQuery: "Marty",
    timeCategory: '90',
    mood: 'emotional',
    description: ""
  },
  {
    title: "波止場",
    year: 1954,
    timeCategory: '120',
    mood: 'exciting',
    description: "テリーは元ボクサーだが、落ちぶれた今は波止場で荷役をする日雇い労働者であった。テリーがボクサーをやめ..."
  },
  {
    title: "地上より永遠に",
    year: 1953,
    timeCategory: '120',
    mood: 'emotional',
    description: "1941年、真珠湾攻撃を目前にしたハワイ・ホノルル基地に赴任したプルーは、上官に逆らったことで残忍な..."
  },
  {
    title: "地上最大のショウ",
    year: 1952,
    timeCategory: '150',
    mood: 'emotional',
    description: "世界最大のサーカスとして知られているリングリング・ブラザース＝バーナム・アンド・ベイリー一座に、新し..."
  },
  {
    title: "巴里のアメリカ人",
    year: 1951,
    timeCategory: '120',
    mood: 'relaxing',
    description: "パリで画家修業を続けるジェリーが、歌手のアンリと友情を結ぶ。やがてジェリーは、リズという美しい娘と出..."
  },
  {
    title: "イヴの総て",
    year: 1950,
    timeCategory: '150',
    mood: 'emotional',
    description: "ある日、新進女優イヴ・ハリントンはアメリカ演劇界の栄えある賞に輝いた。だが、彼女がここまで上り詰める..."
  },
  {
    title: "オール・ザ・キングスメン",
    year: 1949,
    timeCategory: '120',
    mood: 'emotional',
    description: ""
  },
  {
    title: "ハムレット",
    year: 1948,
    timeCategory: '150',
    mood: 'emotional',
    description: ""
  },
  {
    title: "紳士協定",
    year: 1947,
    timeCategory: '120',
    mood: 'emotional',
    description: "売れっ子ライターのフィルは、新天地ニューヨークで、週刊誌の編集長から反ユダヤ主義に関する記事の執筆を..."
  },
  {
    title: "我等の生涯の最良の年",
    year: 1946,
    timeCategory: '150',
    mood: 'emotional',
    description: "アメリカ中部の町に帰還した3人の復員兵。義手になったホーマーは家族の同情に傷つき、アルは銀行家として..."
  },
  {
    title: "失われた週末",
    year: 1945,
    timeCategory: '90',
    mood: 'emotional',
    description: ""
  },
  {
    title: "我が道を往く",
    year: 1944,
    searchQuery: "Going My Way",
    timeCategory: '120',
    mood: 'relaxing',
    description: ""
  },
  {
    title: "カサブランカ",
    year: 1943,
    timeCategory: '90',
    mood: 'emotional',
    description: "戦火近づく'40年の仏領モロッコ、カサブランカは、自由を求めて渡米しようとする人々で溢れていた。ナイ..."
  },
  {
    title: "ミニヴァー夫人",
    year: 1942,
    timeCategory: '120',
    mood: 'emotional',
    description: "第二次世界大戦の戦意高揚映画として撮影され、戦争の荒波に巻き込まれながら気丈に生きていくミニヴァー夫..."
  },
  {
    title: "わが谷は緑なりき",
    year: 1941,
    timeCategory: '120',
    mood: 'emotional',
    description: "舞台は19世紀末の英国ウェールズ。一家全員が炭坑で働く貧しい家に育った少年の眼を通して、不幸と貧困に..."
  },
  {
    title: "レベッカ",
    year: 1940,
    timeCategory: '120',
    mood: 'exciting',
    description: "アルフレッド・ヒッチコック監督が「風と共に去りぬ」で知られる名プロデューサー、デビッド・O・セルズニ..."
  },
  {
    title: "風と共に去りぬ",
    year: 1939,
    timeCategory: '150',
    mood: 'emotional',
    description: "1860年、南北戦争に揺らぐジョージア州タラの地に生きる美しいヒロイン、スカーレット・オハラ。激情に..."
  },
  {
    title: "我が家の楽園",
    year: 1938,
    timeCategory: '120',
    mood: 'relaxing',
    description: "風変わりなシカモア家の中で、唯一「まとも」な娘アリスは、トニー・カービーと恋に落ちる。しかし、裕福な..."
  },
  {
    title: "ゾラの生涯",
    year: 1937,
    timeCategory: '120',
    mood: 'emotional',
    description: ""
  },
  {
    title: "巨星ジーグフェルド",
    year: 1936,
    timeCategory: '150',
    mood: 'relaxing',
    description: ""
  },
  {
    title: "戦艦バウンティ号の叛乱",
    year: 1935,
    timeCategory: '120',
    mood: 'exciting',
    description: ""
  },
  {
    title: "或る夜の出来事",
    year: 1934,
    timeCategory: '90',
    mood: 'relaxing',
    description: "大富豪のわがまま娘エリーは、結婚を反対されて家出。マイアミからNYへ向かうバスで出会った失業中の新聞..."
  },
  {
    title: "カヴァルケード",
    year: 1933,
    timeCategory: '120',
    mood: 'emotional',
    description: ""
  },
  {
    title: "グランド・ホテル",
    year: 1932,
    searchQuery: "Grand Hotel",
    timeCategory: '120',
    mood: 'emotional',
    description: "限定された空間で起きる事件を巧みに連関させると言ったいわゆる“グランド・ホテル形式”の原点。過去の想..."
  },
  {
    title: "シマロン",
    year: 1931,
    timeCategory: '120',
    mood: 'emotional',
    description: ""
  },
  {
    title: "西部戦線異状なし",
    year: 1930,
    timeCategory: '120',
    mood: 'emotional',
    description: "第1次大戦がはじまってまもない、ドイツのある町。群衆の歓声に送られて、戦場へ向かう大部隊が進軍してゆ..."
  },
  {
    title: "ブロードウェイ・メロディー",
    year: 1929,
    timeCategory: '90',
    mood: 'relaxing',
    description: ""
  },
  {
    title: "つばさ",
    year: 1927,
    searchQuery: "Wings",
    timeCategory: '150',
    mood: 'exciting',
    description: ""
  },
  {
    title: "ハムネット",
    year: 2026,
    timeCategory: '120',
    mood: 'emotional',
    description: "1580年、イングランド。貧しいラテン語教師ウィリアム・シェイクスピアは自由奔放なアグネスと出会い、..."
  },
  {
    title: "ブルータリスト",
    year: 2025,
    timeCategory: '150',
    mood: 'emotional',
    description: "第二次世界大戦下にホロコーストを生き延び、アメリカへと渡ったハンガリー系ユダヤ人建築家ラースロー・ト..."
  },
  {
    title: "フェイブルマンズ",
    year: 2023,
    timeCategory: '150',
    mood: 'emotional',
    description: "初めて映画館を訪れて以来、映画に夢中になった少年サミー・フェイブルマンは、母親から8ミリカメラをプレ..."
  },
  {
    title: "パワー・オブ・ザ・ドッグ",
    year: 2022,
    timeCategory: '120',
    mood: 'emotional',
    description: "威圧的だがカリスマ性に満ちた牧場主。弟の新妻とその息子である青年に対して冷酷な敵意をむき出しにしてゆ..."
  },
  {
    title: "1917 命をかけた伝令",
    year: 2020,
    timeCategory: '120',
    mood: 'emotional',
    description: "第一次世界大戦真っ只中の1917年のある朝、若きイギリス人兵士のスコフィールドとブレイクにひとつの重..."
  },
  {
    title: "ボヘミアン・ラプソディ",
    year: 2019,
    timeCategory: '120',
    mood: 'relaxing',
    description: "世界が熱狂した伝説のバンド＜クイーン＞。その光と影を数々の名曲とともに描く感動のミュージック・エンタ..."
  },
  {
    title: "スリー・ビルボード",
    year: 2018,
    timeCategory: '120',
    mood: 'exciting',
    description: "アメリカ、ミズーリ州の田舎町エビングの道路に立ち並ぶ３枚の広告看板。それは７カ月前に娘を殺されたミル..."
  },
  {
    title: "レヴェナント：蘇えりし者",
    year: 2016,
    timeCategory: '150',
    mood: 'exciting',
    description: "アメリカ西部の原野、ハンターのヒュー・グラスは狩猟の最中に熊の襲撃を受けて瀕死の重傷を負うが、同行し..."
  },
  {
    title: "6才のボクが、大人になるまで。",
    year: 2015,
    timeCategory: '150',
    mood: 'emotional',
    description: "メイソンは、母オリヴィアと姉サマンサとテキサス州の小さな町で生活していた。彼が6歳のとき、母は子供た..."
  },
  {
    title: "ファミリー・ツリー",
    year: 2012,
    timeCategory: '120',
    mood: 'relaxing',
    description: "マットは、妻と２人の娘と共にハワイで暮らしていた。ところがある日、妻がボートの事故に遭い、そのまま昏..."
  },
  {
    title: "ソーシャル・ネットワーク",
    year: 2011,
    timeCategory: '120',
    mood: 'emotional',
    description: "2003年、ハーバード大学の学生マーク・ザッカーバーグは、学内で友人を増やすためのサイトを親友のエド..."
  },
  {
    title: "アバター",
    year: 2010,
    timeCategory: '90',
    mood: 'emotional',
    description: "リサーチとデザインのスキルを結集させてパンドラを創造した、才能溢れるアーティストたちを紹介する。"
  },
  {
    title: "つぐない",
    year: 2008,
    timeCategory: '120',
    mood: 'emotional',
    description: "1930年代、戦火が忍び寄るイギリス。政府官僚の長女セシーリアは、兄妹のように育てられた使用人の息子..."
  },
  {
    title: "バベル",
    year: 2007,
    timeCategory: '150',
    mood: 'emotional',
    description: "モロッコを旅行中のアメリカ人夫婦のリチャードとスーザンが、突然何者かによって銃撃を受け、妻が負傷する..."
  },
  {
    title: "ブロークバック・マウンテン",
    year: 2006,
    timeCategory: '120',
    mood: 'emotional',
    description: "1963年、ワイオミング州ブロークバック・マウンテン。定職のないイニスとジャックは、羊放牧の職を得て..."
  },
  {
    title: "アビエイター",
    year: 2005,
    timeCategory: '150',
    mood: 'emotional',
    description: "18歳で亡き父の石油掘削機の事業を引き継ぎ大富豪となったハワード・ヒューズ。1927年、21歳の彼は..."
  },
  {
    title: "めぐりあう時間たち",
    year: 2003,
    timeCategory: '120',
    mood: 'emotional',
    description: "イギリスの女性小説家バージニア・ウルフの「ダロウェイ夫人」をモチーフに、3つの時代、3つの場所で暮ら..."
  },
  {
    title: "哀れなるものたち",
    year: 2024,
    searchQuery: "Poor Things",
    timeCategory: '150',
    mood: 'relaxing',
    description: "天才外科医によってよみがえった若き女性ベラ・バクスターの驚くべき進化を描く。未知なる世界を知るため、..."
  },
  {
    title: "イニシェリン島の精霊",
    year: 2023,
    timeCategory: '120',
    mood: 'relaxing',
    description: "本土が内戦に揺れる1923年、アイルランドの孤島・イニシェリン島。島民全員が知り合いである平和な島で..."
  },
  {
    title: "ウエスト・サイド・ストーリー",
    year: 2022,
    timeCategory: '150',
    mood: 'exciting',
    description: "夢や成功を求め、多くの移民たちが暮らすニューヨークのウエスト・サイド。 だが、貧困や差別に不満を募ら..."
  },
  {
    title: "続・ボラット 栄光ナル国家だったカザフスタンのためのアメリカ貢ぎ物計画",
    year: 2021,
    searchQuery: "Borat Subsequent Moviefilm",
    timeCategory: '90',
    mood: 'relaxing',
    description: ""
  },
  {
    title: "ワンス・アポン・ア・タイム・イン・ハリウッド",
    year: 2020,
    timeCategory: '150',
    mood: 'exciting',
    description: "リック・ダルトンはピークを過ぎたTV俳優。映画スターへの道がなかなか拓けず焦る日々が続いていた。そん..."
  },
  {
    title: "レディ・バード",
    year: 2018,
    timeCategory: '90',
    mood: 'relaxing',
    description: "2002 年、カリフォルニア州サクラメント。閉塞感溢れる片田舎のカトリック系高校から、大都会ニューヨ..."
  },
  {
    title: "ラ・ラ・ランド",
    year: 2017,
    timeCategory: '120',
    mood: 'relaxing',
    description: "売れない女優とジャズピアニストの恋を、往年の名作ミュージカル映画を彷彿させるゴージャスでロマンチック..."
  },
  {
    title: "オデッセイ",
    year: 2016,
    searchQuery: "The Martian",
    timeCategory: '90',
    mood: 'emotional',
    description: ""
  },
  {
    title: "グランド・ブダペスト・ホテル",
    year: 2015,
    timeCategory: '90',
    mood: 'relaxing',
    description: "1932年、品格が漂うグランド・ブダペスト・ホテルを仕切る名コンシェルジュのグスタヴ・Hは、究極のお..."
  },
  {
    title: "アメリカン・ハッスル",
    year: 2014,
    timeCategory: '150',
    mood: 'exciting',
    description: "詐欺師アーヴィンと、その相棒で愛人のシドニー。彼らはFBI捜査官リッチーに逮捕されるが、無罪放免を条..."
  },
  {
    title: "レ・ミゼラブル",
    year: 2013,
    timeCategory: '150',
    mood: 'emotional',
    description: "19世紀のフランス。パンを盗んだ罪で19年間の服役生活を送ったジャン・バルジャンは、ついに仮釈放され..."
  },
  {
    title: "ハングオーバー! 消えた花ムコと史上最悪の二日酔い",
    year: 2010,
    searchQuery: "The Hangover",
    timeCategory: '90',
    mood: 'relaxing',
    description: "2日後に結婚する男性ダグは独身最後の夜を楽しもうと、悪友のフィルやステュ、これから義理の弟になるアラ..."
  },
  {
    title: "それでも恋するバルセロナ",
    year: 2009,
    timeCategory: '90',
    mood: 'emotional',
    description: "バルセロナを舞台に四角関係の恋愛を描いたロマンティック・コメディ。アメリカ人女性ふたりとスペイン人の..."
  },
  {
    title: "スウィーニー・トッド フリート街の悪魔の理髪師",
    year: 2008,
    searchQuery: "Sweeney Todd: The Demon Barber of Fleet Street",
    timeCategory: '90',
    mood: 'emotional',
    description: ""
  },
  {
    title: "ドリームガールズ",
    year: 2007,
    timeCategory: '120',
    mood: 'relaxing',
    description: "1960年代のデトロイト。ライブハウスでディーナ、エフィ、ローレルの「ドリーメッツ」がライブハウスの..."
  },
];
