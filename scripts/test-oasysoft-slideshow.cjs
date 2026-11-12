'use strict';
const assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm'),path=require('node:path');
const source=fs.readFileSync(path.join(__dirname,'../demos/oasysoft/assets/slideshow.js'),'utf8');
function fixture(reducedMotion){
 const callbacks={},timers=new Map();let timerId=0;
 const node=()=>({hidden:false,dataset:{},events:{},attrs:{},addEventListener(type,fn){this.events[type]=fn},setAttribute(k,v){this.attrs[k]=v}});
 const video={controls:true,paused:true,play(){this.paused=false;return {catch(){}}},pause(){this.paused=true}};
 const slides=[node(),node()];slides[0].contains=x=>x===video;slides[1].contains=()=>false;
 const dots=[node(),node()],pause=node(),prev=node(),next=node(),controls=node(),status=node(),root=node();
 root.contains=x=>x===pause;root.querySelectorAll=q=>q==='[data-oasys-slide]'?slides:q==='[data-oasys-go]'?dots:[video];
 root.querySelector=q=>({'.slideshow-controls':controls,'[data-oasys-pause]':pause,'[data-oasys-prev]':prev,'[data-oasys-next]':next,'[data-oasys-status]':status})[q];
 const reduced={matches:reducedMotion,addEventListener(type,fn){callbacks.reduced=fn}};
 const document={hidden:false,querySelectorAll:()=>[root],addEventListener(type,fn){callbacks[type]=fn}};
 const window={matchMedia:()=>reduced,setTimeout(fn){const id=++timerId;timers.set(id,fn);return id},clearTimeout(id){timers.delete(id)}};
 vm.runInNewContext(source,{document,window});
 return {root,slides,dots,pause,prev,next,video,status,document,callbacks,timers,tick(){const fn=timers.values().next().value;assert.ok(fn,'A rotation timer exists');timers.clear();fn()}};
}
const auto=fixture(false);assert.equal(auto.root.dataset.playing,'true');assert.equal(auto.video.paused,false);auto.tick();assert.equal(auto.slides[1].hidden,false);assert.equal(auto.video.paused,true);assert.equal(auto.dots[1].attrs['aria-pressed'],'true');auto.tick();assert.equal(auto.slides[0].hidden,false);
auto.pause.events.click();assert.equal(auto.root.dataset.playing,'false');assert.equal(auto.video.paused,true);assert.equal(auto.timers.size,0);auto.next.events.click();assert.equal(auto.root.dataset.playing,'false');assert.equal(auto.timers.size,0);
auto.pause.events.click();assert.equal(auto.root.dataset.playing,'true');auto.root.events.mouseenter();assert.equal(auto.root.dataset.playing,'false');auto.root.events.mouseleave();assert.equal(auto.root.dataset.playing,'true');auto.document.hidden=true;auto.callbacks.visibilitychange();assert.equal(auto.timers.size,0);auto.document.hidden=false;auto.callbacks.visibilitychange();assert.equal(auto.root.dataset.playing,'true');
const reduced=fixture(true);assert.equal(reduced.root.dataset.playing,'false');assert.equal(reduced.video.paused,true);assert.equal(reduced.timers.size,0);reduced.pause.events.click();assert.equal(reduced.root.dataset.playing,'true');reduced.callbacks.reduced({matches:true});assert.equal(reduced.root.dataset.playing,'false');
const backwards=fixture(true);backwards.prev.events.click();assert.equal(backwards.slides[1].hidden,false);backwards.dots[0].events.click();assert.equal(backwards.slides[0].hidden,false);
console.log('Slideshow checks passed: automatic rotation, video pause, wraparound, manual navigation, persistent user pause, hover, hidden tab and reduced-motion preferences.');
