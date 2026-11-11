"""Refresh owned, crawlable content-image discovery data after a Jekyll build.
Run from the website repository: python scripts/build-image-sitemap.py
Then rebuild Jekyll to render image-sitemap.xml. No third-party images or generated user photos.
"""
from pathlib import Path
from html.parser import HTMLParser
from urllib.parse import urlparse,unquote
import json
root=Path(__file__).resolve().parents[1]
class Images(HTMLParser):
 def __init__(self):super().__init__();self.images=[];self.canonical=None;self.noindex=False
 def handle_starttag(self,tag,attrs):
  a=dict(attrs)
  if tag=='link' and a.get('rel')=='canonical':self.canonical=a.get('href')
  if tag=='meta' and a.get('name')=='robots' and 'noindex' in a.get('content',''):self.noindex=True
  if tag=='img' and a.get('alt','').strip():
   u=urlparse(a.get('src',''));p=unquote(u.path)
   if u.netloc not in ('','learntechfoundation.org'):return
   if not p.startswith(('/img/','/assets/images/')) or '/icons/' in p:return
   if (root/p.lstrip('/')).is_file():self.images.append(p)
data=[]
for p in sorted((root/'_site').rglob('*.html')):
 parser=Images();parser.feed(p.read_text(encoding='utf-8'))
 if parser.canonical and parser.images and not parser.noindex:
  page=urlparse(parser.canonical)
  if not (page.path=='/' or page.path.startswith(('/about/','/academy/','/products/','/portfolio/','/work/','/services/','/tools/'))):continue
  if page.netloc=='learntechfoundation.org' and not any(x['page']==page.path for x in data):data.append({'page':page.path,'images':sorted(set(parser.images))})
(root/'_data/image_sitemap.json').write_text(json.dumps(data,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
print(f'Image sitemap: {len(data)} landing pages; {len({img for x in data for img in x["images"]})} unique owned content images.')
