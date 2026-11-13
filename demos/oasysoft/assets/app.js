'use strict';
document.documentElement.classList.add('js');
const toggle=document.querySelector('.menu-toggle'),nav=document.querySelector('#main-nav');
if(toggle&&nav){toggle.addEventListener('click',()=>{const open=toggle.getAttribute('aria-expanded')!=='true';toggle.setAttribute('aria-expanded',String(open));nav.classList.toggle('open',open)});document.addEventListener('keydown',e=>{if(e.key==='Escape'){toggle.setAttribute('aria-expanded','false');nav.classList.remove('open')}})}
const search=document.querySelector('#faq-search');
if(search){const items=[...document.querySelectorAll('.faq-item')],count=document.querySelector('#faq-count');search.addEventListener('input',()=>{const q=search.value.toLocaleLowerCase().trim();let n=0;for(const item of items){const match=item.textContent.toLocaleLowerCase().includes(q);item.hidden=!match;if(match)n++}count.textContent=n+' question'+(n===1?'':'s')+' found'})}
const form=document.querySelector('#support-form');
if(form){const link=document.querySelector('#email-draft'),status=document.querySelector('#draft-status');form.addEventListener('input',()=>{link.hidden=true;link.removeAttribute('href');status.textContent=''});form.addEventListener('submit',e=>{e.preventDefault();if(!form.reportValidity())return;const data=new FormData(form);const body=['Company: '+data.get('company'),'Contact: '+data.get('person'),'Email: '+data.get('email'),'Tel: '+data.get('phone'),'Product Serial No: '+data.get('serial'),'','Query: '+data.get('query')].join('\n');link.href='mailto:info@oasysoft.com?subject='+encodeURIComponent('OASys support enquiry')+'&body='+encodeURIComponent(body);link.hidden=false;status.textContent='Draft prepared locally. Nothing has been sent. Open it in your email app to review and send.'})}
const preferredDesign=document.querySelector('#preferred-design'),discussRedesign=document.querySelector('#discuss-redesign'),referenceWebsite=document.querySelector('#reference-website'),referenceError=document.querySelector('#reference-error');
if(preferredDesign&&discussRedesign&&referenceWebsite){
  function referenceUrl(value){
    value=value.trim();
    if(!value)return '';
    if(value.length>500||/\s/.test(value))return null;
    try{const url=new URL(/^https?:\/\//i.test(value)?value:/^[a-z][a-z0-9+.-]*:/i.test(value)?value:'https://'+value);return ['https:','http:'].includes(url.protocol)&&url.hostname&&!url.username&&!url.password&&url.href.length<=500?url.href:null;}catch(_){return null;}
  }
  function updateDiscussion(){
    const allowed=['undecided','corporate','showcase','editorial','other'];
    const design=allowed.includes(preferredDesign.value)?preferredDesign.value:'undecided';
    const destination=new URL(discussRedesign.href),reference=referenceUrl(referenceWebsite.value);
    const error=reference===null?'Enter a valid http or https website link without spaces or login details.':'';
    referenceWebsite.setCustomValidity(error);referenceError.textContent=error;
    discussRedesign.setAttribute('aria-disabled',String(!!error));
    destination.searchParams.set('design',design);destination.searchParams.delete('reference');
    if(reference)destination.searchParams.set('reference',reference);
    discussRedesign.href=destination.href;
    return !error;
  }
  preferredDesign.addEventListener('change',updateDiscussion);
  referenceWebsite.addEventListener('input',updateDiscussion);
  referenceWebsite.addEventListener('blur',()=>{const reference=referenceUrl(referenceWebsite.value);if(reference)referenceWebsite.value=reference;updateDiscussion();});
  discussRedesign.addEventListener('click',event=>{if(!updateDiscussion()){event.preventDefault();referenceWebsite.reportValidity();referenceWebsite.focus();}});
  updateDiscussion();
}
