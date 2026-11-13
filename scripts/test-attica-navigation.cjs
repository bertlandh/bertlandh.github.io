'use strict';
const assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm');
const source=fs.readFileSync(process.argv[2]||require('node:path').join(__dirname,'../demos/attica/assets/app.js'),'utf8');
const documentEvents={},headerEvents={};let pending=null;const media={matches:true,addEventListener(){}};
function node(){return {events:{},attrs:{'aria-expanded':'false'},hidden:true,addEventListener(k,f){this.events[k]=f;},setAttribute(k,v){this.attrs[k]=v;},getAttribute(k){return this.attrs[k];},focus(){document.activeElement=this;}};}
const groups=[0,1].map(()=>{const group=node(),trigger=node(),panel=node(),link=node();panel.querySelector=()=>link;group.trigger=trigger;group.panel=panel;group.link=link;group.querySelector=s=>s==='.nav-trigger'?trigger:panel;group.contains=x=>[group,trigger,panel,link].includes(x);return group;});
const menu=node(),nav=node(),navLink=node();const classes=new Set();nav.classList={toggle:(v,on)=>on?classes.add(v):classes.delete(v),remove:v=>classes.delete(v)};nav.querySelectorAll=()=>[navLink];
const header={querySelector:s=>s==='.menu'?menu:nav,querySelectorAll:()=>groups,contains:x=>x===menu||x===nav||groups.some(g=>g.contains(x)),addEventListener:(k,f)=>headerEvents[k]=f};
const document={activeElement:null,querySelector:s=>s==='[data-alumni-header]'?header:null,querySelectorAll:()=>[],addEventListener:(k,f)=>documentEvents[k]=f};
const window={matchMedia:()=>media,setTimeout:f=>(pending=f,1),clearTimeout:()=>pending=null};
vm.runInNewContext(source,{document,window,URLSearchParams,location:{search:''}});
const a=groups[0],b=groups[1];a.events.mouseenter();assert.equal(a.panel.hidden,true);pending();assert.equal(a.panel.hidden,false);a.events.mouseleave();assert.equal(a.panel.hidden,true);
a.trigger.events.click();assert.equal(a.panel.hidden,false);b.trigger.events.click();assert.equal(a.panel.hidden,true);assert.equal(b.panel.hidden,false);
a.trigger.events.keydown({key:'ArrowDown',preventDefault(){}});assert.equal(document.activeElement,a.link);assert.equal(b.panel.hidden,true);a.events.keydown({key:'Escape',preventDefault(){},stopPropagation(){}});assert.equal(a.panel.hidden,true);assert.equal(document.activeElement,a.trigger);
menu.events.click();assert.equal(menu.attrs['aria-expanded'],'true');a.trigger.events.click();navLink.events.click();assert.equal(menu.attrs['aria-expanded'],'false');assert.equal(a.panel.hidden,true);
menu.events.click();documentEvents.click({target:{}});assert.equal(menu.attrs['aria-expanded'],'false');media.matches=false;a.events.mouseenter();assert.equal(a.panel.hidden,true);
console.log('Alumni navigation checks passed: delayed hover, one open panel, ArrowDown, Escape/focus restoration, mobile close on link, outside click and touch fallback.');
