'use strict';
const assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm');
const source=fs.readFileSync(process.argv[2]||require('node:path').join(__dirname,'../demos/attica/assets/app.js'),'utf8');
function setup(reduced=false){
 const slides=[{hidden:false},{hidden:true},{hidden:true}],handlers={},events={},motionEvents={};
 const elements={};for(const key of ['previous','next','pause','counter','announcement'])elements[key]={textContent:'',disabled:false,addEventListener:(type,fn)=>handlers[key+':'+type]=fn};
 const root={querySelectorAll:()=>slides,querySelector:s=>elements[s.slice(6,-1)],addEventListener:(t,f)=>events[t]=f,contains:x=>x===elements.pause};
 const motion={matches:reduced,addEventListener:(t,f)=>motionEvents[t]=f};let timer=null;
 const document={hidden:false,querySelector:()=>null,querySelectorAll:()=>[root],addEventListener:(t,f)=>events[t]=f};
 const window={matchMedia:()=>motion,setInterval:fn=>(timer=fn,1),clearInterval:()=>timer=null};
 vm.runInNewContext(source,{document,window,URLSearchParams,location:{search:''}});
 return {slides,elements,handlers,events,motion,motionEvents,document,tick:()=>timer&&timer(),active:()=>!!timer};
}
let r=setup();assert.ok(r.active());r.tick();assert.equal(r.elements.counter.textContent,'2 / 3');r.handlers['next:click']();assert.equal(r.elements.counter.textContent,'3 / 3');r.handlers['next:click']();assert.equal(r.elements.counter.textContent,'1 / 3');r.handlers['previous:click']();assert.equal(r.elements.counter.textContent,'3 / 3');assert.equal(r.slides.filter(s=>!s.hidden).length,1);
r.handlers['pause:click']();assert.equal(r.active(),false);r.handlers['pause:click']();assert.ok(r.active());r.events.mouseenter();assert.equal(r.active(),false);r.events.mouseleave();assert.ok(r.active());r.events.focusin();assert.equal(r.active(),false);r.events.focusout({relatedTarget:null});assert.ok(r.active());r.document.hidden=true;r.events.visibilitychange();assert.equal(r.active(),false);r.document.hidden=false;r.events.visibilitychange();assert.ok(r.active());r.motion.matches=true;r.motionEvents.change();assert.equal(r.active(),false);assert.equal(r.elements.pause.disabled,true);
r=setup(true);assert.equal(r.active(),false);r.handlers['next:click']();assert.equal(r.elements.counter.textContent,'2 / 3');
console.log('Slideshow checks passed: autoplay, wraparound, manual controls, pause, hover/focus/visibility suspension and reduced motion.');
