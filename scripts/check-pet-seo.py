"""Audit built PrettiPetz HTML, structured data and prelaunch indexing gates.
Uses Python's standard library; run after a Jekyll build. --ready-fixture is only
for a separately built test copy with its launch flag enabled.
"""
from pathlib import Path
from html.parser import HTMLParser
from urllib.parse import urlparse
import json,sys,xml.etree.ElementTree as ET

root=Path(sys.argv[1] if len(sys.argv)>1 and not sys.argv[1].startswith('--') else Path(__file__).resolve().parents[1]/'_site')
ready='--ready-fixture' in sys.argv
class Page(HTMLParser):
 def __init__(self):
  super().__init__();self.meta={};self.titles=[];self.canonicals=[];self.scripts=[];self.images=[];self.h1=0;self.intitle=False;self.injson=False;self.buf=''
 def handle_starttag(self,tag,attrs):
  a=dict(attrs)
  if tag=='meta':self.meta[a.get('name',a.get('property',''))]=a.get('content','')
  if tag=='title':self.intitle=True;self.buf=''
  if tag=='link' and a.get('rel')=='canonical':self.canonicals.append(a.get('href'))
  if tag=='script' and a.get('type')=='application/ld+json':self.injson=True;self.buf=''
  if tag=='img':self.images.append(a)
  if tag=='h1':self.h1+=1
 def handle_data(self,text):
  if self.intitle or self.injson:self.buf+=text
 def handle_endtag(self,tag):
  if tag=='title' and self.intitle:self.titles.append(self.buf.strip());self.intitle=False
  if tag=='script' and self.injson:self.scripts.append(json.loads(self.buf));self.injson=False

files=list((root/'pets').rglob('*.html'));assert len(files)>=16,'Expected category and existing pages'
titles=set();descriptions=set();report=[]
for f in files:
 p=Page();p.feed(f.read_text(encoding='utf-8'));label=f.relative_to(root).as_posix()
 assert len(p.titles)==1 and p.titles[0] not in titles,(label,'missing/duplicate title');titles.add(p.titles[0])
 description=p.meta.get('description','');assert len(description)>=70 and description not in descriptions,(label,'missing/duplicate description');descriptions.add(description)
 assert len(p.canonicals)==1 and urlparse(p.canonicals[0]).scheme=='https' and not urlparse(p.canonicals[0]).query,(label,'canonical')
 for key in ['og:title','og:description','og:url','og:image','og:image:alt','twitter:title','twitter:description','twitter:image','twitter:image:alt']:
  assert p.meta.get(key),(label,key)
 assert p.meta['og:url']==p.canonicals[0],(label,'OG canonical mismatch')
 robots=p.meta.get('robots','');assert ('noindex' not in robots and 'max-image-preview:large' in robots) if ready else 'noindex' in robots,(label,'indexing gate')
 assert p.h1==1,(label,'H1')
 assert p.scripts,(label,'JSON-LD')
 nodes=[n for script in p.scripts for n in script.get('@graph',[script])]
 types=[n.get('@type') for n in nodes]
 assert 'Organization' in types and 'WebSite' in types,(label,'entity markup')
 website=next(n for n in nodes if n.get('@type')=='WebSite')
 if p.canonicals[0]!=website['url']:assert 'BreadcrumbList' in types,(label,'missing breadcrumbs')
 for node in nodes:
  if node.get('@type')=='BreadcrumbList':
   assert len(node['itemListElement'])>=2,(label,'breadcrumb count')
   assert [i['position'] for i in node['itemListElement']]==list(range(1,len(node['itemListElement'])+1)),(label,'breadcrumb order')
 assert 'Product' not in types and 'LocalBusiness' not in types and 'PetStore' not in types,(label,'unsupported product/address assertion')
 if '/bertland/' in p.canonicals[0] or '/krishna/' in p.canonicals[0]:assert 'ProfilePage' in types,(label,'person profile')
 people={n.get('name') for n in nodes if n.get('@type')=='Person'};assert {'Bertland Hope','Krishna Baddaloo'}<=people
 for image in p.images:
  assert 'alt' in image,(label,'missing alt')
  if image.get('src','').endswith('mark.svg'):continue
  assert len(image['alt'])>=12 and image.get('width') and image.get('height'),(label,'image description/dimensions')
 report.append({'page':label,'title':p.titles[0],'description':description,'images':len(p.images),'structured_data_types':types})
tree=ET.parse(root/'pets/image-sitemap.xml');images=tree.findall('.//{http://www.google.com/schemas/sitemap-image/1.1}image')
assert len(images)>=11 if ready else len(images)==0,'Image sitemap launch gate'
robots=(root/'robots.txt').read_text();assert ('/pets/image-sitemap.xml' in robots) if ready else '/pets/image-sitemap.xml' not in robots,'Robots sitemap launch gate'
assert not any('noindex' in line for line in robots.splitlines()),'Robots must allow crawling the noindex instruction'
if not ready:assert '/pets/' not in (root/'sitemap.xml').read_text(),'Prelaunch pages leaked into main sitemap'
print(json.dumps({'mode':'ready fixture' if ready else 'prelaunch','pages_checked':len(files),'image_sitemap_entries':len(images),'pages':report},indent=2))
