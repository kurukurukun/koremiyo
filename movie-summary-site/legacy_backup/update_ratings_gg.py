import urllib.request
import urllib.parse
import re
import json
import time

FILE_PATH = "js/golden_globe_data.js"

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
    print("=== ゴールデングローブ賞 評価スクレイピング開始 ===")
    
    with open(FILE_PATH, "r", encoding="utf-8") as f:
        content = f.read()

    match = re.search(r'const goldenGlobeWinners = (\[.*?\]);', content, re.DOTALL)
    if not match:
        print("エラー: js/golden_globe_data.js の形式が読み取れません。")
        return

    json_str = match.group(1)
    json_str = re.sub(r'//.*', '', json_str)
    json_str = re.sub(r',\s*\]', ']', json_str)
    
    try:
        movies = json.loads(json_str)
    except Exception as e:
        print("JSONのパースに失敗しました。", e)
        return

    for i, movie in enumerate(movies):
        title = movie.get("title", "")
        year = movie.get("year", "")
        print(f"[{year}年] {title} のデータを取得中...")
        
        filmarks = get_filmarks_score(title)
        time.sleep(1)
        eiga = get_eiga_score(title)
        time.sleep(1)
        
        print(f"  -> Filmarks: {filmarks}, 映画.com: {eiga}")
        
        movie["eigaScore"] = eiga
        movie["filmarksScore"] = filmarks
        
        js_content = "const goldenGlobeWinners = [\n"
        for m in movies:
            js_content += f'    {{ "year": {m["year"]}, "title": "{m["title"]}", "eigaScore": "{m["eigaScore"]}", "filmarksScore": "{m["filmarksScore"]}" }},\n'
        js_content += "];\n"

        with open(FILE_PATH, "w", encoding="utf-8") as f:
            f.write(js_content)

    print("=== 完了しました！ golden_globe_data.js が完全に更新されました ===")

if __name__ == "__main__":
    main()
