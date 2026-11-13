'use strict';
const assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm'),path=require('node:path');
const root=path.resolve(__dirname,'..');
const source=fs.readFileSync(path.join(root,'assets/js/enquiry-context.js'),'utf8');
function run(query,existing={}){
 const fields={enquiry_type:{value:'unsure',addEventListener(){}},requested_product:{value:'',disabled:true,required:false},_subject:{value:'LearnTech project or product enquiry'}};
 for(const name of ['name','email','phone','business','website','message'])fields[name]={value:existing[name]||''};
 fields.contact_request={checked:false};fields.namedItem=name=>fields[name]||null;
 const productField={hidden:true},links=[{href:'https://wa.me/18765600735'},{href:'https://wa.me/18765600735?text=Old'},{href:'https://example.com/keep'}];
 const form={elements:fields,querySelector:()=>productField};
 const document={querySelector:()=>form,querySelectorAll:selector=>selector==='[data-lt-channel="whatsapp"]'?links:[]};
 vm.runInNewContext(source,{document,location:{search:query},URLSearchParams,URL});return {fields,links,productField};
}
for(const [id,label] of Object.entries({heritage:'The Heritage',bold:'Black & Red',community:'The Connection',other:'A different direction',undecided:'Discuss the options'})) {
 const r=run('?review=attica&design='+id+'&reference=https%3A%2F%2Fexample.com%2F');
 assert.equal(r.fields.enquiry_type.value,'new'); assert.equal(r.fields.business.value,'Fraternity of Attica alumni'); assert.ok(r.fields.message.value.includes(label)); assert.ok(r.fields.message.value.includes('https://example.com/')); assert.equal(r.fields.website.value,'');
 assert.equal(r.fields.name.value,''); assert.equal(r.fields.email.value,''); assert.equal(r.fields.phone.value,''); assert.equal(r.fields.contact_request.checked,false);
 assert.ok(new URL(r.links[0].href).searchParams.get('text').includes(label)); assert.equal(r.links[2].href,'https://example.com/keep');
}
for(const bad of ['javascript:alert(1)','https://name:secret@example.com/','https://example.com/ with spaces','https://example.com/'+ 'a'.repeat(500)]) assert.ok(!run('?review=attica&reference='+encodeURIComponent(bad)).fields.message.value.includes('Reference website I like:'));
const kept=run('?review=attica',{business:'Own',message:'My words'}); assert.equal(kept.fields.business.value,'Own');assert.equal(kept.fields.message.value,'My words');
assert.ok(run('?review=attica&design=unknown').fields.message.value.includes('Discuss the options'));
for(const theme of ['','heritage','bold','community']) {const html=fs.readFileSync(path.join(root,'demos/attica',theme,'index.html'),'utf8');assert.ok(html.includes('noindex,nofollow'));assert.ok(!html.includes('/contact/'));}
console.log('Attica checks passed: five directions, validated references, preserved edits, untouched personal fields and consent, WhatsApp context and noindex pages.');
