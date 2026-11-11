const fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict');
const root=path.resolve(__dirname,'../_site'),tools=require('../_data/business_tools.json');
const hub=fs.readFileSync(path.join(root,'tools/index.html'),'utf8');assert.equal((hub.match(/id="tools-list"/g)||[]).length,1);
for(const t of Object.values(tools)){
 const html=fs.readFileSync(path.join(root,t.url,'index.html'),'utf8');
 assert.equal((html.match(/id="tool-start"/g)||[]).length,1,t.file+' has one working-area target');
 assert.ok(html.includes('href="/tools/#tools-list"'),t.file+' returns to the cards');
 assert.ok(hub.includes('href="'+t.url+'#tool-start"'),t.file+' hub link opens the working area');
 assert.ok(html.includes('/assets/js/tool-experience.js'),t.file+' supports direct-entry navigation');
 const canonical=html.match(/<link rel="canonical" href="([^"]+)"/);assert.ok(canonical&&!canonical[1].includes('#'),'Canonical remains fragment-free');
}
console.log('All '+Object.keys(tools).length+' tool working-area targets, return links, hub entries and canonical URLs pass.');
