(function () {
  'use strict';
  var root = document.querySelector('[data-invoice-tool]'); if (!root) return;
  var T = window.LearnTechTools, Backup = window.LearnTechInvoiceBackup, form = document.getElementById('invoice-form'), lines = document.getElementById('invoice-lines');
  var status = document.getElementById('invoice-status'), savedSelect = document.getElementById('saved-documents');
  var STORAGE = 'learntech_documents_v1', records = [], activeId = '', lineId = 0, started = false;
  var fields = ['type','currency','number','date','deadline','sender','senderDetails','client','clientDetails','discount','taxRate','notes'];
  var currencies = ['JMD','USD','CAD','GBP','EUR'];
  function say(text, error) { status.textContent = text; status.classList.toggle('tool-error', !!error); }
  function today() { var d = new Date(); return d.getFullYear() + '-' + String(d.getMonth()+1).padStart(2,'0') + '-' + String(d.getDate()).padStart(2,'0'); }
  function money(cents, currency) { return new Intl.NumberFormat('en-JM', {style:'currency', currency:currency, currencyDisplay:'code'}).format(cents / 100); }
  function addLine(item) {
    if (lines.children.length >= 40) { say('A document can contain up to 40 items.', true); return; }
    item = item || {description:'',quantity:1,rate:0}; var id = ++lineId, div = document.createElement('div'); div.className = 'tool-line';
    div.innerHTML = '<label for="line-desc-'+id+'">Description</label><input id="line-desc-'+id+'" data-line="description" maxlength="500" required><div class="tool-fields"><div><label for="line-qty-'+id+'">Quantity</label><input id="line-qty-'+id+'" data-line="quantity" type="number" min="0.001" max="100000" step="0.001" required></div><div><label for="line-rate-'+id+'">Unit price</label><input id="line-rate-'+id+'" data-line="rate" type="number" min="0" max="1000000" step="0.01" required></div></div><button type="button" class="tool-remove">Remove this item</button>';
    ['description','quantity','rate'].forEach(function (k) { div.querySelector('[data-line="'+k+'"]').value = item[k]; });
    div.querySelector('button').addEventListener('click', function () { if (lines.children.length === 1) { say('Keep at least one item in your document.', true); return; } div.remove(); preview(false); });
    lines.appendChild(div);
  }
  function read() {
    var d = {}; fields.forEach(function (k) { d[k] = form.elements[k].value.trim(); });
    d.lines = Array.from(lines.children).map(function (row) { return {description:row.querySelector('[data-line="description"]').value.trim(),quantity:Number(row.querySelector('[data-line="quantity"]').value),rate:Number(row.querySelector('[data-line="rate"]').value)}; });
    d.discount = Number(d.discount); d.taxRate = Number(d.taxRate); return d;
  }
  function valid(d) { return Backup.validDocument(d); }
  function totals(d) {
    var amounts = d.lines.map(function(l){return Math.round(l.quantity * Math.round(l.rate * 100));});
    var subtotal = amounts.reduce(function(a,b){return a+b;},0), discount = Math.round(d.discount * 100);
    if (!Number.isSafeInteger(subtotal) || discount > subtotal) throw new Error('The discount cannot exceed the subtotal.');
    var tax = Math.round((subtotal-discount)*d.taxRate/100);
    return {amounts:amounts,subtotal:subtotal,discount:discount,tax:tax,total:subtotal-discount+tax};
  }
  function textReport(d, t) {
    return T.brandedReport('LEARNTECH DOCUMENT TOOL\n' + d.type.toUpperCase() + ' ' + d.number + '\nDate: ' + d.date + (d.deadline ? '\n' + (d.type === 'invoice' ? 'Payment due: ' : 'Valid until: ') + d.deadline : '') + '\nCurrency: '+d.currency+'\n\nFROM\n'+d.sender+'\n'+d.senderDetails+'\n\nFOR\n'+d.client+'\n'+d.clientDetails+'\n\nITEMS\n'+d.lines.map(function(l,i){return l.description+' | '+l.quantity+' × '+money(Math.round(l.rate*100),d.currency)+' = '+money(t.amounts[i],d.currency);}).join('\n')+'\n\nSubtotal: '+money(t.subtotal,d.currency)+'\nDiscount: '+money(t.discount,d.currency)+'\nTax ('+d.taxRate+'%): '+money(t.tax,d.currency)+'\nTOTAL: '+money(t.total,d.currency)+'\n\n'+d.notes+'\n\nPrepared with https://learntechfoundation.org/tools/invoice-quotation/\nReview this document before use. This is not proof of payment.', 'invoice_quotation');
  }
  function preview(requireValid) {
    if (requireValid && !form.reportValidity()) return null;
    var d = read(), t; if (requireValid && !valid(d)) { say('Please check all document fields.',true); return null; }
    try { t = totals(d); } catch (e) { say(e.message,true); document.querySelector('[data-tool-email]').hidden = true; return null; }
    var esc=T.escape, m=function(n){return money(n,d.currency);};
    document.getElementById('invoice-preview').innerHTML = '<div class="tool-doc-head"><div><h2>'+esc(d.type)+'</h2><p><strong>'+esc(d.number)+'</strong></p><p>'+esc(d.date)+'</p>'+(d.deadline?'<p>'+(d.type==='invoice'?'Due: ':'Valid until: ')+esc(d.deadline)+'</p>':'')+'</div><div><strong>'+esc(d.sender || 'Your business name')+'</strong><p>'+esc(d.senderDetails)+'</p></div></div><h3>For</h3><p><strong>'+esc(d.client || 'Customer name')+'</strong></p><p>'+esc(d.clientDetails)+'</p><table><caption class="is-sr-only">Document line items in '+esc(d.currency)+'</caption><thead><tr><th scope="col">Description</th><th scope="col">Qty</th><th scope="col">Price</th><th scope="col">Amount</th></tr></thead><tbody>'+d.lines.map(function(l,i){return '<tr><td>'+esc(l.description || 'Item description')+'</td><td>'+esc(l.quantity)+'</td><td>'+esc(m(Math.round(l.rate*100)))+'</td><td>'+esc(m(t.amounts[i]))+'</td></tr>';}).join('')+'</tbody></table><div class="tool-totals"><p><span>Subtotal</span><span>'+esc(m(t.subtotal))+'</span></p><p><span>Discount</span><span>−'+esc(m(t.discount))+'</span></p><p><span>Tax ('+esc(d.taxRate)+'%)</span><span>'+esc(m(t.tax))+'</span></p><p class="tool-total"><span>Total</span><span>'+esc(m(t.total))+'</span></p></div>'+(d.notes?'<h3>Terms &amp; notes</h3><p>'+esc(d.notes)+'</p>':'')+'<p class="tool-note">Currency: '+esc(d.currency)+'. '+(d.type==='quotation'?'Quotation only; not an invoice or proof of payment.':'Not proof of payment.')+'</p>'+T.creditHTML('invoice_quotation');
    document.getElementById('convert-document').hidden = d.type !== 'quotation';
    if (valid(d)) T.report(textReport(d,t),'invoice_quotation'); else document.querySelector('[data-tool-email]').hidden=true;
    return {document:d,report:textReport(d,t)};
  }
  function refreshList() { savedSelect.replaceChildren(new Option('Choose a saved document','')); records.forEach(function(r){savedSelect.add(new Option(r.document.number+' — '+r.document.client+' ('+r.document.type+')',r.id));}); savedSelect.value=activeId; }
  function persist(next) { try {localStorage.setItem(STORAGE,JSON.stringify({version:1,records:next}));records=next;refreshList();return true;}catch(_){say('This browser could not save the document. Download or print a copy instead.',true);return false;} }
  function nextNumber(type) { var prefix=type==='quotation'?'QTE-':'INV-',n=1; records.forEach(function(r){var m=r.document.number.match(new RegExp('^'+prefix+'(\\d+)$'));if(m)n=Math.max(n,Number(m[1])+1);});return prefix+String(n).padStart(3,'0'); }
  function load(d,id) { fields.forEach(function(k){form.elements[k].value=d[k];});lines.replaceChildren();d.lines.forEach(addLine);activeId=id||'';savedSelect.value=activeId;document.getElementById('deadline-label').firstChild.textContent=d.type==='invoice'?'Payment due ':'Valid until ';preview(false); }
  function fresh() { form.reset();activeId='';form.elements.date.value=today();form.elements.number.value=nextNumber(form.elements.type.value);lines.replaceChildren();addLine();refreshList();preview(false);say('New document. Existing saved documents are unchanged.'); }
  try {var stored=JSON.parse(localStorage.getItem(STORAGE)||'null');if(stored&&stored.version===1&&Array.isArray(stored.records))records=stored.records.filter(function(r){return r&&typeof r.id==='string'&&valid(r.document);}).slice(0,200);}catch(_){say('Saved documents could not be read. You can still use the tool.',true);}
  form.addEventListener('input',function(){if(!started){T.track('tool_start','invoice_quotation');started=true;}preview(false);});
  form.elements.type.addEventListener('change',function(){activeId='';form.elements.number.value=nextNumber(this.value);document.getElementById('deadline-label').firstChild.textContent=this.value==='invoice'?'Payment due ':'Valid until ';preview(false);});
  document.getElementById('add-line').addEventListener('click',function(){addLine();preview(false);});
  form.addEventListener('submit',function(e){e.preventDefault();if(preview(true)){say('Preview updated. Review the details before using it.');document.getElementById('invoice-preview').focus();T.track('tool_complete','invoice_quotation');}});
  document.getElementById('save-document').addEventListener('click',function(){var r=preview(true);if(!r)return;var id=activeId||crypto.randomUUID(),next=records.filter(function(x){return x.id!==id;});if(next.length>=200){say('Save a backup and remove older documents before saving more than 200.',true);return;}next.unshift({id:id,document:r.document});activeId=id;if(persist(next)){say('Saved on this device. Download a backup to keep it outside this browser.');T.track('tool_save','invoice_quotation');}});
  document.getElementById('new-document').addEventListener('click',function(){if(confirm('Start a new document? Unsaved changes in this form will be cleared.'))fresh();});
  savedSelect.addEventListener('change',function(){var r=records.find(function(x){return x.id===savedSelect.value;});if(r){load(r.document,r.id);say('Saved document opened.');}});
  document.getElementById('delete-document').addEventListener('click',function(){if(savedSelect.value&&confirm('Delete this saved document from this browser?')){var id=savedSelect.value;activeId='';if(persist(records.filter(function(r){return r.id!==id;})))say('Saved copy deleted. The current preview remains available.');}});
  var pendingImports=[],fileBusy=false,fileStatus=document.getElementById('backup-status');
  function fileSay(text,error){fileStatus.textContent=text;fileStatus.classList.toggle('tool-error',!!error);}
  function fileButtons(busy){fileBusy=busy;['download-json','export-documents','read-backup'].forEach(function(id){document.getElementById(id).disabled=busy;});}
  function clearImport(){pendingImports=[];document.getElementById('import-review').hidden=true;document.getElementById('imported-documents').replaceChildren();}
  document.getElementById('backup-encrypt').addEventListener('change',function(){document.getElementById('backup-password-fields').hidden=!this.checked;if(!this.checked){document.getElementById('backup-password').value='';document.getElementById('backup-confirm').value='';}});
  async function downloadJSON(all){
    if(fileBusy)return;var list,name;
    if(all){if(!records.length){fileSay('There are no saved documents to back up.',true);return;}list=records;name='saved-documents';}
    else{var r=preview(true);if(!r){fileSay('Complete the document fields before downloading.',true);return;}list=[{id:activeId||crypto.randomUUID(),document:r.document}];name=r.document.type+'-'+r.document.number;}
    var encrypted=document.getElementById('backup-encrypt').checked,password=encrypted?document.getElementById('backup-password').value:'';
    if(encrypted&&(password.length<12||password.length>256||password!==document.getElementById('backup-confirm').value)){fileSay('Use matching passwords between 12 and 256 characters.',true);return;}
    fileButtons(true);fileSay(encrypted?'Encrypting your JSON on this device…':'Preparing JSON…');
    try{var text=await Backup.pack(list,password,window.crypto);T.download(text,name+(encrypted?'-encrypted':'')+'.json','application/json');fileSay(encrypted?'Encrypted JSON downloaded. Keep the password separately.':'JSON downloaded. This file is not encrypted.');document.getElementById('backup-password').value='';document.getElementById('backup-confirm').value='';T.track('tool_download','invoice_quotation');}catch(e){fileSay(e.message,true);}finally{password='';fileButtons(false);}
  }
  document.getElementById('download-json').addEventListener('click',function(){downloadJSON(false);});
  document.getElementById('export-documents').addEventListener('click',function(){downloadJSON(true);});
  document.getElementById('import-documents').addEventListener('change',function(){clearImport();document.getElementById('import-password').value='';fileSay(this.files.length?'File selected. Enter its password if encrypted, then read the file.':'Choose a JSON file to import.');});
  document.getElementById('read-backup').addEventListener('click',async function(){
    if(fileBusy)return;clearImport();var picker=document.getElementById('import-documents'),file=picker.files[0],password=document.getElementById('import-password').value;
    if(!file){fileSay('Choose a JSON file first.',true);return;}if(file.size>Backup.maxBytes){fileSay('Choose a JSON file no larger than 8 MB.',true);return;}
    fileButtons(true);picker.disabled=true;fileSay('Reading your file on this device…');
    try{pendingImports=await Backup.unpack(await file.text(),password,window.crypto);var select=document.getElementById('imported-documents');pendingImports.forEach(function(r,i){select.add(new Option(r.document.number+' — '+r.document.client+' ('+r.document.type+')',String(i)));});document.getElementById('import-summary').textContent=pendingImports.length+' document(s) ready to review. Nothing has been saved or changed yet.';document.getElementById('import-review').hidden=false;fileSay('File validated. Choose a document to open or add the imported documents to this browser.');}catch(e){clearImport();fileSay(e.message,true);}finally{password='';document.getElementById('import-password').value='';picker.disabled=false;fileButtons(false);}
  });
  document.getElementById('open-imported').addEventListener('click',function(){var r=pendingImports[Number(document.getElementById('imported-documents').value)];if(!r)return;load(r.document,'');say('Imported as an editable draft. Save on this device or download JSON to keep changes.');fileSay('Document opened for editing. Existing saved documents are unchanged.');form.scrollIntoView({block:'start',behavior:'instant'});form.elements.number.focus({preventScroll:true});});
  document.getElementById('save-imported').addEventListener('click',function(){if(!pendingImports.length)return;var merged=records.slice(),added=0;pendingImports.forEach(function(r){if(!merged.some(function(x){return x.id===r.id;})){merged.push(r);added++;}});if(merged.length>200){fileSay('This would exceed 200 saved documents. Open a document individually or remove older saves first.',true);return;}if(persist(merged))fileSay(added+' document(s) added. Existing saves were preserved; matching backup IDs were skipped.');else fileSay('This browser could not save the import. You can still open a document for editing.',true);});
  window.addEventListener('pagehide',function(){['backup-password','backup-confirm','import-password'].forEach(function(id){document.getElementById(id).value='';});pendingImports=[];});
  document.getElementById('print-document').addEventListener('click',function(){var r=preview(true);if(r){T.track('tool_print','invoice_quotation');T.printDocument(r.document.type);}});
  document.getElementById('download-document').addEventListener('click',function(){var r=preview(true);if(r){T.download(r.report,'learntech-'+r.document.type+'.txt');T.track('tool_download','invoice_quotation');}});
  document.getElementById('convert-document').addEventListener('click',function(){var r=preview(true);if(!r)return;var d=r.document;d.type='invoice';d.number=nextNumber('invoice');d.date=today();d.deadline='';load(d,'');say('Converted to a new invoice draft. The saved quotation is unchanged.');});
  var emailForm=document.querySelector('[data-tool-report-form]');emailForm.addEventListener('submit',function(e){if(!preview(true))e.preventDefault();});
  fresh();
})();
