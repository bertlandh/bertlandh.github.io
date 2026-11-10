(function () {
  'use strict';
  var root = document.querySelector('[data-invoice-tool]'); if (!root) return;
  var T = window.LearnTechTools, form = document.getElementById('invoice-form'), lines = document.getElementById('invoice-lines');
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
  function valid(d) {
    return d && ['invoice','quotation'].includes(d.type) && currencies.includes(d.currency) && fields.every(function(k){return ['discount','taxRate'].includes(k) ? Number.isFinite(d[k]) : typeof d[k] === 'string' && d[k].length <= (k === 'notes' ? 1500 : k === 'senderDetails' || k === 'clientDetails' ? 700 : 160);}) &&
      /^\d{4}-\d{2}-\d{2}$/.test(d.date) && (!d.deadline || /^\d{4}-\d{2}-\d{2}$/.test(d.deadline)) && d.number.length > 0 && d.number.length <= 50 && d.sender.length > 0 && d.client.length > 0 && d.discount >= 0 && d.discount <= 1e12 && d.taxRate >= 0 && d.taxRate <= 100 &&
      Array.isArray(d.lines) && d.lines.length > 0 && d.lines.length <= 40 && d.lines.every(function (l) {return typeof l.description === 'string' && l.description.length > 0 && l.description.length <= 500 && Number.isFinite(l.quantity) && l.quantity > 0 && l.quantity <= 100000 && Number.isFinite(l.rate) && l.rate >= 0 && l.rate <= 1000000;});
  }
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
  document.getElementById('export-documents').addEventListener('click',function(){if(!records.length){say('There are no saved documents to back up.',true);return;}T.download(JSON.stringify({version:1,createdWith:T.creditText('invoice_quotation'),records:records},null,2),'learntech-documents-'+today()+'.json','application/json');T.track('tool_download','invoice_quotation');});
  document.getElementById('import-documents').addEventListener('change',async function(){var file=this.files[0];if(!file)return;try{if(file.size>1000000)throw Error();var b=JSON.parse(await file.text());if(b.version!==1||!Array.isArray(b.records)||b.records.length>200||b.records.some(function(r){return !r||typeof r.id!=='string'||r.id.length>100||!valid(r.document);}))throw Error();var merged=records.slice();b.records.forEach(function(r){if(!merged.some(function(x){return x.id===r.id;}))merged.push({id:r.id,document:r.document});});if(merged.length>200)throw Error();if(persist(merged))say('Backup restored. Existing saved documents were preserved.');}catch(_){say('Could not restore this file. Use a valid LearnTech JSON backup, under 1 MB and 200 documents.',true);}this.value='';});
  document.getElementById('print-document').addEventListener('click',function(){if(preview(true)){T.track('tool_print','invoice_quotation');window.print();}});
  document.getElementById('download-document').addEventListener('click',function(){var r=preview(true);if(r){T.download(r.report,'learntech-'+r.document.type+'.txt');T.track('tool_download','invoice_quotation');}});
  document.getElementById('convert-document').addEventListener('click',function(){var r=preview(true);if(!r)return;var d=r.document;d.type='invoice';d.number=nextNumber('invoice');d.date=today();d.deadline='';load(d,'');say('Converted to a new invoice draft. The saved quotation is unchanged.');});
  var emailForm=document.querySelector('[data-tool-report-form]');emailForm.addEventListener('submit',function(e){if(!preview(true))e.preventDefault();});
  fresh();
})();
