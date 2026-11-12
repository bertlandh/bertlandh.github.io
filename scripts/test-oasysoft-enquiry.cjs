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
for(const [id,label] of Object.entries({corporate:'Modern Corporate',showcase:'Product Showcase',editorial:'Jamaican Business',undecided:'Not sure yet / discuss the options'})){
 const r=run('?interest=improve&review=oasysoft&design='+id);
 assert.equal(r.fields.enquiry_type.value,'improve');assert.equal(r.fields.business.value,'OASys');assert.equal(r.fields.website.value,'http://www.oasysoft.com/');assert.ok(r.fields.message.value.includes(label));assert.equal(r.fields._subject.value,'OASys website redesign enquiry');
 assert.ok(new URL(r.links[0].href).searchParams.get('text').includes(label));assert.equal(r.links[2].href,'https://example.com/keep');
 assert.equal(r.fields.contact_request.checked,false);assert.equal(r.fields.name.value,'');assert.equal(r.fields.email.value,'');assert.equal(r.fields.phone.value,'');
}
const generic=run('?interest=product&product=custodia');assert.equal(generic.fields.requested_product.value,'custodia');assert.equal(generic.productField.hidden,false);assert.equal(generic.fields.business.value,'');
const unknown=run('?review=other&business=Injected&message=Injected');assert.equal(unknown.fields.business.value,'');assert.equal(unknown.fields.message.value,'');
const invalid=run('?review=oasysoft&design=%3Cscript%3E&email=wrong%40example.com');assert.ok(invalid.fields.message.value.includes('Not sure yet'));assert.ok(!invalid.fields.message.value.includes('<script>'));assert.equal(invalid.fields.email.value,'');
const edited=run('?review=oasysoft&design=corporate',{business:'My business',message:'My own words',website:'https://my.example/'});assert.equal(edited.fields.business.value,'My business');assert.equal(edited.fields.message.value,'My own words');assert.equal(edited.fields.website.value,'https://my.example/');
const demo=path.join(root,'demos/oasysoft'),comparison=fs.readFileSync(path.join(demo,'index.html'),'utf8');assert.ok(!comparison.includes('learntechfoundation.org/contact/'));assert.ok(comparison.includes('connect/?interest=improve&amp;review=oasysoft'));assert.ok(comparison.includes('id="preferred-design"'));
for(const theme of ['corporate','showcase','editorial'])for(const file of fs.readdirSync(path.join(demo,theme)).filter(n=>n.endsWith('.html'))){const html=fs.readFileSync(path.join(demo,theme,file),'utf8');assert.ok(html.includes('review=oasysoft&amp;design='+theme+'#enquiry'));}
console.log('OASys enquiry checks passed: four design contexts, existing product flow, unknown-context rejection, safe fallback, preserved edits, WhatsApp context, untouched personal details/consent and all 25 demo routes.');
