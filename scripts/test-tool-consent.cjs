const {test} = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const path = require('node:path');
const source = fs.readFileSync(path.join(__dirname,'../assets/js/enquiries.js'),'utf8');
function setup(choice, hostname='learntechfoundation.org') {
  const listeners={}, scripts=[], store=new Map(); if(choice)store.set('learntech_optional_analytics',choice);
  const panel={hidden:true,scrollIntoView(){}}, win={};
  const context={window:win,document:{currentScript:{dataset:{ltAnalyticsEnabled:'true',ltGaId:'G-TEST'}},referrer:'https://search.example/private?q=secret',cookie:'',querySelector:s=>s==='[data-lt-consent-panel]'?panel:null,querySelectorAll:()=>[],createElement:()=>({}),head:{appendChild:s=>scripts.push(s)},addEventListener:(n,f)=>{listeners[n]=f;}},location:{origin:'https://learntechfoundation.org',pathname:'/tools/website-health/',hostname:hostname,reload(){}},localStorage:{getItem:k=>store.get(k)||null,setItem:(k,v)=>store.set(k,v)},URL,Date};
  vm.runInNewContext(source,context);
  return {context,win,scripts,click(v){listeners.click({target:{closest:s=>s==='[data-lt-consent]'?{dataset:{ltConsent:v}}:null}});}};
}
test('no analytics script or tool event before consent',()=>{const s=setup();s.win.LearnTechEvents.track('tool_complete',{tool:'website_health'});assert.equal(s.scripts.length,0);assert.equal(s.win.dataLayer,undefined);});
test('declining keeps tools analytics off',()=>{const s=setup('denied');s.win.LearnTechEvents.track('tool_download',{tool:'invoice_quotation'});assert.equal(s.scripts.length,0);});
test('consented tool events contain only allowlisted fixed metadata',()=>{const s=setup('granted');s.win.LearnTechEvents.track('tool_report_request',{tool:'website_health',email:'private@example.org',url:'https://client.example',report:'confidential',enquiry_type:'unsafe value'});const events=s.win.dataLayer.map(a=>Array.from(a));const e=events.find(a=>a[1]==='tool_report_request');assert.ok(e);assert.deepEqual(Object.keys(e[2]).sort(),['page_location','page_referrer','tool','transport_type']);assert.equal(e[2].page_location,'https://learntechfoundation.org/tools/website-health/');assert.equal(e[2].page_referrer,'https://search.example/');assert.equal(s.scripts.length,1);});
test('withdrawal blocks further tool events and arbitrary event names',()=>{const s=setup('granted');const before=s.win.dataLayer.length;s.win.LearnTechEvents.track('made_up_event',{tool:'website_health'});assert.equal(s.win.dataLayer.length,before);s.click('denied');const after=s.win.dataLayer.length;s.win.LearnTechEvents.track('tool_complete',{tool:'website_health'});assert.equal(s.win.dataLayer.length,after);assert.equal(s.win['ga-disable-G-TEST'],true);});

test('local previews do not send Analytics even with saved consent',()=>{const s=setup('granted','127.0.0.1');s.win.LearnTechEvents.track('tool_credit_click',{tool:'seo_health'});assert.equal(s.scripts.length,0);assert.equal(s.win.dataLayer,undefined);});
