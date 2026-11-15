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
for (const [key, title] of Object.entries({cbg:'Chicken Back Gravy and Such Delights',innadidancehall:'Inna Di Dancehall',collection:'Professor Donna P. Hope’s Book Collection'})) {
 const r=run('?interest=books&book='+key);
 assert.equal(r.fields.enquiry_type.value,'books');
 assert.equal(r.fields.business.required,false);
 assert.ok(r.fields.message.value.includes(title));
 assert.ok(r.fields.message.value.includes('Quantity needed:'));
 assert.ok(r.fields._subject.value.includes(title));
 assert.equal(r.fields.contact_request.checked,false);
 for(const name of ['name','email','phone','business','website'])assert.equal(r.fields[name].value,'');
 assert.ok(new URL(r.links[0].href).searchParams.get('text').includes(title));
 assert.equal(r.links[2].href,'https://example.com/keep');
 assert.equal(r.fields.requested_product.disabled,true);
}
assert.equal(run('?book=unknown').fields.message.value,'');
assert.equal(run('?book=__proto__').fields.message.value,'');
assert.equal(run('?book=cbg',{message:'My existing enquiry'}).fields.message.value,'My existing enquiry');
assert.equal(run('?review=attica&book=cbg').fields.enquiry_type.value,'new');
assert.equal(run('?interest=new').fields.business.required,true);
console.log('Book enquiries passed: bounded titles, preserved edits, optional organisation for books, untouched personal fields/consent and WhatsApp context.');
