const test=require('node:test'),assert=require('node:assert/strict'),B=require('../assets/js/brandsnap-core.js');
test('rectangular logos retain their aspect ratio inside each placement',()=>{for(const pos of ['br','bl','tr','tl','center'])for(const [w,h] of [[320,190],[1080,1600]]){const r=B.logoRect(420,140,w,h,40,pos);assert.ok(Math.abs(r.width/r.height-3)<1e-12);assert.ok(r.x>=0&&r.y>=0&&r.x+r.width<=w&&r.y+r.height<=h);}});
test('portrait logos are not stretched',()=>{const r=B.logoRect(100,500,1080,900,20,'tl');assert.equal(r.height/r.width,5);});
test('long words wrap and truncated messages fit narrow output',()=>{const m=s=>Array.from(s).length*8;for(const text of ['A useful offer for your customers today','x'.repeat(140),'😀'.repeat(80)]){const r=B.textLines(text,120,m,2);assert.ok(r.truncated);assert.ok(r.lines.length<=2);assert.ok(r.lines.every(s=>m(s)<=120));assert.ok(r.lines.at(-1).endsWith('…'));}});
test('short text is unchanged and empty text produces no lines',()=>{assert.deepEqual(B.textLines('Hello world',200,s=>s.length*7,2),{lines:['Hello world'],truncated:false});assert.deepEqual(B.textLines('',200,s=>s.length*7,2),{lines:[],truncated:false});});
test('camera cleanup stops every track',()=>{let stopped=0;B.stopTracks({getTracks:()=>[{stop:()=>stopped++},{stop:()=>stopped++}]});B.stopTracks(null);assert.equal(stopped,2);});
test('invalid logo geometry is rejected',()=>{assert.throws(()=>B.logoRect(0,100,320,200,20,'br'));assert.throws(()=>B.logoRect(100,100,320,200,90,'br'));});

