import json
import re
from datetime import datetime

# Read JS data files and extract IDs
def extract_ids_from_js(filepath, var_name):
    ids = []
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
            # Try to parse the JS array object
            match = re.search(r'const\s+' + var_name + r'\s*=\s*(\[.*\]);', content, re.DOTALL)
            if match:
                js_array = match.group(1)
                # Extremely rudimentary regex to extract id: 1234
                id_matches = re.finditer(r'id:\s*(\d+)', js_array)
                for m in id_matches:
                    ids.append(m.group(1))
    except Exception as e:
        print(f"Error reading {filepath}: {e}")
    return ids

def main():
    print("Generating sitemap.xml...")
    
    base_url = "https://www.koremiyo.com"
    today = datetime.now().strftime("%Y-%m-%d")
    
    xml_content = '<?xml version="1.0" encoding="UTF-8"?>\n'
    xml_content += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'
    
    # Root URL
    xml_content += '  <url>\n'
    xml_content += f'    <loc>{base_url}/</loc>\n'
    xml_content += f'    <lastmod>{today}</lastmod>\n'
    xml_content += '    <changefreq>daily</changefreq>\n'
    xml_content += '    <priority>1.0</priority>\n'
    xml_content += '  </url>\n'
    
    xml_content += '</urlset>\n'
    
    with open('sitemap.xml', 'w', encoding='utf-8') as f:
        f.write(xml_content)
        
    print("sitemap.xml generated successfully (Top page only)!")

if __name__ == "__main__":
    main()
