import urllib.request
import urllib.parse
import re
import json
import time
import os

TMDB_API_KEY = os.environ.get("TMDB_API_KEY")
FILE_PATH = "lib/data/trending.ts"

if not TMDB_API_KEY:
    print("Error: TMDB_API_KEY is not set.")
    exit(1)

def get_filmarks_score(title):
    try:
        url = f"https://filmarks.com/search/movies?q={urllib.parse.quote(title)}"
        req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
        html = urllib.request.urlopen(req).read().decode("utf-8")
        match = re.search(r'c-rating__score[^>]*>([\d\.]+)</div>', html)
        if match:
            return match.group(1)
    except Exception as e:
        print(f"Filmarks error for {title}: {e}")
    return "-.-"

def get_eiga_score(title):
    try:
        url = f"https://eiga.com/search/{urllib.parse.quote(title)}/"
        req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
        html = urllib.request.urlopen(req).read().decode("utf-8")
        match = re.search(r'class="rating-star val\d* small">([\d\.]+)<', html)
        if not match:
            match = re.search(r'data-rating="([\d\.]+)"', html)
        if match:
            return match.group(1)
    except Exception as e:
        print(f"Eiga error for {title}: {e}")
    return "-.-"

def main():
    print("=== 話題作(Trending) スコアスクレイピング開始 ===")
    
    # 1. TMDBから話題作を取得
    tmdb_url = f"https://api.themoviedb.org/3/trending/movie/day?api_key={TMDB_API_KEY}&language=ja-JP"
    req = urllib.request.Request(tmdb_url)
    res = urllib.request.urlopen(req).read().decode("utf-8")
    data = json.loads(res)
    movies = data.get("results", [])[:20] # トップ20件
    
    print(f"{len(movies)}件の話題作を取得しました。スコアを取得します...")

    result_data = []

    # 2. 各映画の評価を取得
    for i, movie in enumerate(movies):
        title = movie.get("title", "")
        print(f"[{i+1}/20] {title} のデータを取得中...")
        
        filmarks = get_filmarks_score(title)
        time.sleep(2) # サーバー負荷軽減のため2秒待機
        eiga = get_eiga_score(title)
        time.sleep(2)
        
        print(f"  -> Filmarks: {filmarks}, 映画.com: {eiga}")
        
        # 必要なデータだけ抽出
        movie_data = {
            "id": movie.get("id"),
            "title": title,
            "original_title": movie.get("original_title"),
            "overview": movie.get("overview"),
            "poster_path": movie.get("poster_path"),
            "backdrop_path": movie.get("backdrop_path"),
            "vote_average": movie.get("vote_average"),
            "release_date": movie.get("release_date"),
            "eigaScore": eiga,
            "filmarksScore": filmarks
        }
        result_data.append(movie_data)

    # 3. TSファイルとして保存
    js_content = "export const trendingMovies: any[] = " + json.dumps(result_data, ensure_ascii=False, indent=2) + ";\n"

    with open(FILE_PATH, "w", encoding="utf-8") as f:
        f.write(js_content)

    print(f"=== 完了しました！ {FILE_PATH} が更新されました ===")

if __name__ == "__main__":
    main()
