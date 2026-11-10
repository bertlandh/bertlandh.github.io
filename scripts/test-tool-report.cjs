const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const vm=require('node:vm');
const source=fs.readFileSync(path.join(__dirname,'../assets/js/tool-common.js'),'utf8');
const template=fs.readFileSync(path.join(__dirname,'../_includes/tool-report.html'),'utf8');
function setup(){
 const events=[],listeners={};
 const form={elements:{message:{value:''},tool:{value:''},_subject:{value:''},_autoresponse:{value:'Short fixed acknowledgement'}},matches:s=>s==='[data-tool-report-form]'};
 const preview={textContent:''};const section={hidden:true,querySelector:s=>s==='form'?form:preview};
 const window={LearnTechEvents:{track:(n,p)=>events.push([n,p])}};
 const context={window,document:{querySelector:()=>section,addEventListener:(n,f)=>listeners[n]=f}};
 vm.runInNewContext(source,context);return {window,form,preview,section,events,submit(prevented=false){const e={target:form,defaultPrevented:prevented,preventDefault(){this.defaultPrevented=true;}};listeners.submit(e);return e;}};
}
test('report payload is conventional message; content remains text',()=>{const s=setup();const report='<img src=x onerror=alert(1)>\nPublic report';s.window.LearnTechTools.report(report,'website_health');assert.equal(s.form.elements.message.value,report);assert.equal(s.preview.textContent,report);assert.equal(s.section.hidden,false);assert.equal(s.form.elements._subject.value,'LearnTech website health report');assert.equal(s.form.elements._autoresponse.value,'Short fixed acknowledgement');});
test('empty or cancelled requests are not submitted or tracked',()=>{const s=setup();assert.equal(s.submit().defaultPrevented,true);assert.equal(s.events.length,0);s.window.LearnTechTools.report('Test report','invoice_quotation');s.submit(true);assert.equal(s.events.length,0);s.submit();assert.equal(s.events.length,1);assert.equal(s.events[0][0],'tool_report_request');assert.deepEqual(Object.keys(s.events[0][1]),['tool']);});
test('provider form uses native POST and reCAPTCHA-compatible autoresponse',()=>{assert.match(template,/method="POST"/);assert.match(template,/<input(?=[^>]*name="email")(?=[^>]*type="email")[^>]*>/);assert.match(template,/<textarea name="message" hidden/);assert.match(template,/name="_autoresponse"/);assert.match(template,/name="_url"/);assert.doesNotMatch(template,/name="_captcha" value="false"|\/ajax\//);assert.doesNotMatch(template,/name="report"/);});
