import json

movies = [
    {"year": 2026, "title": "ハムネット"},
    {"year": 2025, "title": "ブルータリスト"},
    {"year": 2024, "title": "オッペンハイマー"},
    {"year": 2023, "title": "フェイブルマンズ"},
    {"year": 2022, "title": "パワー・オブ・ザ・ドッグ"},
    {"year": 2021, "title": "ノマドランド"},
    {"year": 2020, "title": "1917 命をかけた伝令"},
    {"year": 2019, "title": "ボヘミアン・ラプソディ"},
    {"year": 2018, "title": "スリー・ビルボード"},
    {"year": 2017, "title": "ムーンライト"},
    {"year": 2016, "title": "レヴェナント：蘇えりし者"},
    {"year": 2015, "title": "6才のボクが、大人になるまで。"},
    {"year": 2014, "title": "それでも夜は明ける"},
    {"year": 2013, "title": "アルゴ"},
    {"year": 2012, "title": "ファミリー・ツリー"},
    {"year": 2011, "title": "ソーシャル・ネットワーク"},
    {"year": 2010, "title": "アバター"},
    {"year": 2009, "title": "スラムドッグ$ミリオネア"},
    {"year": 2008, "title": "つぐない"},
    {"year": 2007, "title": "バベル"},
    {"year": 2006, "title": "ブロークバック・マウンテン"},
    {"year": 2005, "title": "アビエイター"}
]

js_content = "const goldenGlobeWinners = [\n"
for m in movies:
    js_content += f'    {{ "year": {m["year"]}, "title": "{m["title"]}", "eigaScore": "-.-", "filmarksScore": "-.-" }},\n'
js_content += "];\n"

with open("js/golden_globe_data.js", "w", encoding="utf-8") as f:
    f.write(js_content)

