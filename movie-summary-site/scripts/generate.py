import urllib.request
import urllib.parse
import json
import time
import os

academy_winners = [
    { "year": 2025, "title": "ワン・バトル・アフター・アナザー" },
    { "year": 2024, "title": "ANORA アノーラ" },
    { "year": 2023, "title": "オッペンハイマー" },
    { "year": 2022, "title": "エブリシング・エブリウェア・オール・アット・ワンス" },
    { "year": 2021, "title": "コーダ あいのうた" },
    { "year": 2020, "title": "ノマドランド" },
    { "year": 2019, "title": "パラサイト 半地下の家族" },
    { "year": 2018, "title": "グリーンブック" },
    { "year": 2017, "title": "シェイプ・オブ・ウォーター" },
    { "year": 2016, "title": "ムーンライト" },
    { "year": 2015, "title": "スポットライト 世紀のスクープ" },
    { "year": 2014, "title": "バードマン あるいは（無知がもたらす予期せぬ奇跡）" },
    { "year": 2013, "title": "それでも夜は明ける" },
    { "year": 2012, "title": "アルゴ" },
    { "year": 2011, "title": "アーティスト" },
    { "year": 2010, "title": "英国王のスピーチ" },
    { "year": 2009, "title": "ハート・ロッカー" },
    { "year": 2008, "title": "スラムドッグ$ミリオネア" },
    { "year": 2007, "title": "ノーカントリー" },
    { "year": 2006, "title": "ディパーテッド" },
    { "year": 2005, "title": "クラッシュ" },
    { "year": 2004, "title": "ミリオンダラー・ベイビー" },
    { "year": 2003, "title": "ロード・オブ・ザ・リング/王の帰還" },
    { "year": 2002, "title": "シカゴ" },
    { "year": 2001, "title": "ビューティフル・マインド" },
    { "year": 2000, "title": "グラディエーター" },
    { "year": 1999, "title": "アメリカン・ビューティー" },
    { "year": 1998, "title": "恋におちたシェイクスピア" },
    { "year": 1997, "title": "タイタニック" },
    { "year": 1996, "title": "イングリッシュ・ペイシェント" },
    { "year": 1995, "title": "ブレイブハート" },
    { "year": 1994, "title": "フォレスト・ガンプ/一期一会" },
    { "year": 1993, "title": "シンドラーのリスト" },
    { "year": 1992, "title": "許されざる者" },
    { "year": 1991, "title": "羊たちの沈黙" },
    { "year": 1990, "title": "ダンス・ウィズ・ウルブズ" },
    { "year": 1989, "title": "ドライビング Miss デイジー" },
    { "year": 1988, "title": "レインマン" },
    { "year": 1987, "title": "ラストエンペラー" },
    { "year": 1986, "title": "プラトーン" },
    { "year": 1985, "title": "愛と哀しみの果て" },
    { "year": 1984, "title": "アマデウス" },
    { "year": 1983, "title": "愛と追憶の日々" },
    { "year": 1982, "title": "ガンジー" },
    { "year": 1981, "title": "炎のランナー" },
    { "year": 1980, "title": "普通の人々" },
    { "year": 1979, "title": "クレイマー、クレイマー" },
    { "year": 1978, "title": "ディア・ハンター" },
    { "year": 1977, "title": "アニー・ホール" },
    { "year": 1976, "title": "ロッキー" },
    { "year": 1975, "title": "カッコーの巣の上で" },
    { "year": 1974, "title": "ゴッドファーザー PART II" },
    { "year": 1973, "title": "スティング" },
    { "year": 1972, "title": "ゴッドファーザー" },
    { "year": 1971, "title": "フレンチ・コネクション" },
    { "year": 1970, "title": "パットン大戦車軍団" },
    { "year": 1969, "title": "真夜中のカーボーイ" },
    { "year": 1968, "title": "オリバー!" },
    { "year": 1967, "title": "夜の大捜査線" },
    { "year": 1966, "title": "わが命つきるとも" },
    { "year": 1965, "title": "サウンド・オブ・ミュージック" },
    { "year": 1964, "title": "マイ・フェア・レディ" },
    { "year": 1963, "title": "トム・ジョーンズの華麗な冒険" },
    { "year": 1962, "title": "アラビアのロレンス" },
    { "year": 1961, "title": "ウエスト・サイド物語" },
    { "year": 1960, "title": "アパートの鍵貸します" },
    { "year": 1959, "title": "ベン・ハー" },
    { "year": 1958, "title": "恋の手ほどき" },
    { "year": 1957, "title": "戦場にかける橋" },
    { "year": 1956, "title": "80日間世界一周" },
    { "year": 1955, "title": "マーティ", "searchQuery": "Marty" },
    { "year": 1954, "title": "波止場" },
    { "year": 1953, "title": "地上より永遠に" },
    { "year": 1952, "title": "地上最大のショウ" },
    { "year": 1951, "title": "巴里のアメリカ人" },
    { "year": 1950, "title": "イヴの総て" },
    { "year": 1949, "title": "オール・ザ・キングスメン" },
    { "year": 1948, "title": "ハムレット" },
    { "year": 1947, "title": "紳士協定" },
    { "year": 1946, "title": "我等の生涯の最良の年" },
    { "year": 1945, "title": "失われた週末" },
    { "year": 1944, "title": "我が道を往く", "searchQuery": "Going My Way" },
    { "year": 1943, "title": "カサブランカ" },
    { "year": 1942, "title": "ミニヴァー夫人" },
    { "year": 1941, "title": "わが谷は緑なりき" },
    { "year": 1940, "title": "レベッカ" },
    { "year": 1939, "title": "風と共に去りぬ" },
    { "year": 1938, "title": "我が家の楽園" },
    { "year": 1937, "title": "ゾラの生涯" },
    { "year": 1936, "title": "巨星ジーグフェルド" },
    { "year": 1935, "title": "戦艦バウンティ号の叛乱" },
    { "year": 1934, "title": "或る夜の出来事" },
    { "year": 1933, "title": "カヴァルケード" },
    { "year": 1932, "title": "グランド・ホテル", "searchQuery": "Grand Hotel" },
    { "year": 1931, "title": "シマロン" },
    { "year": 1930, "title": "西部戦線異状なし" },
    { "year": 1929, "title": "ブロードウェイ・メロディー" },
    { "year": 1927, "title": "つばさ", "searchQuery": "Wings" }
]

gg_winners = [
    { "year": 2026, "title": "ハムネット" },
    { "year": 2025, "title": "ブルータリスト" },
    { "year": 2024, "title": "オッペンハイマー" },
    { "year": 2023, "title": "フェイブルマンズ" },
    { "year": 2022, "title": "パワー・オブ・ザ・ドッグ" },
    { "year": 2021, "title": "ノマドランド" },
    { "year": 2020, "title": "1917 命をかけた伝令" },
    { "year": 2019, "title": "ボヘミアン・ラプソディ" },
    { "year": 2018, "title": "スリー・ビルボード" },
    { "year": 2017, "title": "ムーンライト" },
    { "year": 2016, "title": "レヴェナント：蘇えりし者" },
    { "year": 2015, "title": "6才のボクが、大人になるまで。" },
    { "year": 2014, "title": "それでも夜は明ける" },
    { "year": 2013, "title": "アルゴ" },
    { "year": 2012, "title": "ファミリー・ツリー" },
    { "year": 2011, "title": "ソーシャル・ネットワーク" },
    { "year": 2010, "title": "アバター" },
    { "year": 2009, "title": "スラムドッグ$ミリオネア" },
    { "year": 2008, "title": "つぐない" },
    { "year": 2007, "title": "バベル" },
    { "year": 2006, "title": "ブロークバック・マウンテン" },
    { "year": 2005, "title": "アビエイター" },
    { "year": 2004, "title": "ロード・オブ・ザ・リング/王の帰還" },
    { "year": 2003, "title": "めぐりあう時間たち" }
]

ggc_winners = [
    { "year": 2025, "title": "ANORA アノーラ", "searchQuery": "Anora" },
    { "year": 2024, "title": "哀れなるものたち", "searchQuery": "Poor Things" },
    { "year": 2023, "title": "イニシェリン島の精霊" },
    { "year": 2022, "title": "ウエスト・サイド・ストーリー" },
    { "year": 2021, "title": "続・ボラット 栄光ナル国家だったカザフスタンのためのアメリカ貢ぎ物計画", "searchQuery": "Borat Subsequent Moviefilm" },
    { "year": 2020, "title": "ワンス・アポン・ア・タイム・イン・ハリウッド" },
    { "year": 2019, "title": "グリーンブック" },
    { "year": 2018, "title": "レディ・バード" },
    { "year": 2017, "title": "ラ・ラ・ランド" },
    { "year": 2016, "title": "オデッセイ", "searchQuery": "The Martian" },
    { "year": 2015, "title": "グランド・ブダペスト・ホテル" },
    { "year": 2014, "title": "アメリカン・ハッスル" },
    { "year": 2013, "title": "レ・ミゼラブル" },
    { "year": 2012, "title": "アーティスト" },
    { "year": 2011, "title": "キッズ・オール・ライト" },
    { "year": 2010, "title": "ハングオーバー! 消えた花ムコと史上最悪の二日酔い", "searchQuery": "The Hangover" },
    { "year": 2009, "title": "それでも恋するバルセロナ" },
    { "year": 2008, "title": "スウィーニー・トッド フリート街の悪魔の理髪師", "searchQuery": "Sweeney Todd: The Demon Barber of Fleet Street" },
    { "year": 2007, "title": "ドリームガールズ" },
    { "year": 2006, "title": "ウォーク・ザ・ライン/君につづく道" }
]

def fetch_json(url):
    try:
        req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
        with urllib.request.urlopen(req) as response:
            return json.loads(response.read().decode('utf-8'))
    except Exception as e:
        print(f"Error fetching {url}: {e}")
        return None

def main():
    all_movies = academy_winners + gg_winners + ggc_winners
    unique_movies = {}
    for m in all_movies:
        if m["title"] not in unique_movies:
            unique_movies[m["title"]] = m

    movies_list = list(unique_movies.values())
    print(f"Processing {len(movies_list)} unique movies...")

    results = []

    for i, movie in enumerate(movies_list):
        query = movie.get("searchQuery", movie["title"])
        print(f"[{i+1}/{len(movies_list)}] Fetching: {query}")
        
        search_url = f"https://www.koremiyo.com/api/tmdb?endpoint=search/movie&query={urllib.parse.quote(query)}&primary_release_year={movie['year']}"
        search_data = fetch_json(search_url)

        if not search_data or not search_data.get('results'):
            search_url = f"https://www.koremiyo.com/api/tmdb?endpoint=search/movie&query={urllib.parse.quote(query)}"
            search_data = fetch_json(search_url)

        if search_data and search_data.get('results'):
            tmdb_movie = search_data['results'][0]
            details_url = f"https://www.koremiyo.com/api/tmdb?endpoint=movie/{tmdb_movie['id']}"
            details = fetch_json(details_url)

            if details:
                runtime = details.get('runtime', 120)
                time_cat = '120'
                if runtime <= 105:
                    time_cat = '90'
                elif runtime >= 136:
                    time_cat = '150'

                genres = [g['name'] for g in details.get('genres', [])]
                mood = 'emotional'
                
                if any(g in genres for g in ['コメディ', 'ファミリー', 'アニメーション', '音楽']):
                    mood = 'relaxing'
                if any(g in genres for g in ['アクション', 'スリラー', 'ホラー', 'SF', 'アドベンチャー', '犯罪']):
                    mood = 'exciting'

                desc = details.get('overview', "あらすじがありません。")
                if len(desc) > 50:
                    desc = desc[:50] + '...'
                if 'あらすじがありません' in desc:
                    desc = "数々の賞を受賞した、世界が認める名作です。"

                results.append({
                    "title": movie["title"],
                    "year": movie["year"],
                    "searchQuery": movie.get("searchQuery", ""),
                    "timeCategory": time_cat,
                    "mood": mood,
                    "description": desc
                })
                time.sleep(0.1) # Be nice to the API
            else:
                print(f"Failed details for {query}")
        else:
            print(f"Not found in search: {query}")

    # Generate quickpicks.ts
    content = "export type TimeCategory = '90' | '120' | '150';\n"
    content += "export type MoodCategory = 'exciting' | 'emotional' | 'relaxing';\n\n"
    content += "export interface QuickPickMovie {\n  title: string;\n  searchQuery?: string;\n  year?: number;\n  timeCategory: TimeCategory;\n  mood: MoodCategory;\n  description: string;\n}\n\n"
    content += "export const quickPicks: QuickPickMovie[] = [\n"

    for r in results:
        content += "  {\n"
        content += f'    title: "{r["title"]}",\n'
        if r["year"]:
            content += f'    year: {r["year"]},\n'
        if r["searchQuery"]:
            content += f'    searchQuery: "{r["searchQuery"]}",\n'
        content += f"    timeCategory: '{r['timeCategory']}',\n"
        content += f"    mood: '{r['mood']}',\n"
        desc_escaped = r["description"].replace('"', '\\"').replace('\n', ' ')
        content += f'    description: "{desc_escaped}"\n'
        content += "  },\n"

    content += "];\n"

    with open(os.path.join(os.path.dirname(__file__), "..", "lib", "data", "quickpicks.ts"), "w", encoding="utf-8") as f:
        f.write(content)

    print(f"Successfully generated quickpicks.ts with {len(results)} movies!")

if __name__ == "__main__":
    main()
