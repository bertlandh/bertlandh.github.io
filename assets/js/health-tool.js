(function () {
  'use strict';
  var root=document.querySelector('[data-health-tool]');if(!root)return;
  var seo=root.dataset.healthMode==='seo', tool=seo?'seo_health':'website_health', actionLabel=seo?'Check SEO basics':'Check website basics';
  var seoLabels=['HTTPS','Page title','Search description','Main heading','Mobile viewport','Page language','Canonical address','Search indexing directive','Image alternative attributes'];
  var T=window.LearnTechTools,form=document.getElementById('health-form'),button=document.getElementById('health-submit'),status=document.getElementById('health-status'),results=document.getElementById('health-results'),report='',started=false;
  function address(value){var u=new URL(/^https?:\/\//i.test(value)?value:'https://'+value);if(!/^https?:$/.test(u.protocol)||u.username||u.password||u.port||u.search||u.hash||!u.hostname.includes('.')||u.hostname.length>253)throw Error('Enter a public page address without a query string, password or custom port.');return u;}
  function render(r){
    var selected=seo?r.checks.filter(function(c){return seoLabels.includes(c.label);}):r.checks;
    var limitations=seo?"One public HTML page only. Presence checks do not judge writing quality or prove indexing. No keyword rankings, search-volume data, backlinks, full-site crawl or ranking guarantee.":r.limitations;
    var checks=document.getElementById('health-checks');checks.replaceChildren();
    selected.forEach(function(c){var el=document.createElement('article');el.className='tool-result';var badge=document.createElement('span');badge.className='tool-badge'+(c.status==='review'?' tool-badge--review':'');badge.textContent=c.status==='review'?'Review suggested':'Observed';el.appendChild(badge);var h=document.createElement('h3');h.textContent=c.label;el.appendChild(h);var p=document.createElement('p');p.textContent=c.detail;el.appendChild(p);if(c.action){var a=document.createElement('p');a.textContent=c.action;el.appendChild(a);}checks.appendChild(el);});
    var count=selected.filter(function(c){return c.status==='review';}).length;
    document.getElementById('health-summary').textContent=count+' areas to review';document.getElementById('health-meta').textContent=r.url+' · Checked '+new Date(r.checkedAt).toLocaleString()+(r.cached?' · Cached public report (up to 10 minutes)':'');
    document.getElementById('health-php').textContent=r.php;document.getElementById('health-limitations').textContent=limitations;
    root.querySelector('[data-tool-credit]').innerHTML=T.creditHTML(tool);
    document.getElementById('health-pagespeed').href='https://pagespeed.web.dev/analysis?url='+encodeURIComponent(r.url);
    report=(seo?'LEARNTECH SEO HEALTH SNAPSHOT':'LEARNTECH WEBSITE HEALTH SNAPSHOT')+'\nPage: '+r.url+'\nChecked: '+r.checkedAt+'\n'+(r.cached?'Cached report; up to 10 minutes old.\n':'')+'\n'+selected.map(function(c){return c.label+' — '+(c.status==='review'?'REVIEW SUGGESTED':'OBSERVED')+'\n'+c.detail+(c.action?'\nNext step: '+c.action:'');}).join('\n\n')+(seo?'':'\n\nPHP: '+r.php+'\nBackups: Not publicly verifiable. Ask when a restore was last tested.')+'\n\n'+limitations+'\n\nhttps://learntechfoundation.org/tools/'+(seo?'seo-health/':'website-health/');
    report=T.brandedReport(report,tool);
    T.report(report,tool);results.hidden=false;document.getElementById('health-results-title').focus();
  }
  form.addEventListener('input',function(){if(!started){T.track('tool_start',tool);started=true;}results.hidden=true;report='';});
  form.addEventListener('submit',async function(e){
    e.preventDefault();if(!form.reportValidity())return;results.hidden=true;report='';var u;
    try{u=address(form.elements.website.value.trim());}catch(err){status.textContent=err.message;status.classList.add('tool-error');return;}
    status.classList.remove('tool-error');status.textContent='Checking the public page. This may take up to a minute…';button.disabled=true;button.textContent='Checking…';root.setAttribute('aria-busy','true');
    var controller=new AbortController(),timer=setTimeout(function(){controller.abort();},65000);
    try{
      var response=await fetch(root.dataset.api,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({url:u.href,permission:true}),signal:controller.signal,credentials:'omit',referrerPolicy:'no-referrer'});
      var r=await response.json();if(!response.ok||r.error)throw Error(r.error||'The website could not be checked right now.');
      if(!Array.isArray(r.checks)||!r.checks.length||!r.checkedAt)throw Error('The checker returned an incomplete report. Please try again.');
      render(r);status.textContent='Your observations are ready below.';T.track('tool_complete',tool);
    }catch(err){status.textContent=err.name==='AbortError'?'The check timed out. Try again, use PageSpeed Insights, or ask us for a manual review.':err.message==='Failed to fetch'?'The checker could not be reached. Try again or use the PageSpeed Insights link.':err.message;status.classList.add('tool-error');T.track('tool_error',tool);}
    finally{clearTimeout(timer);button.disabled=false;button.textContent=actionLabel;root.removeAttribute('aria-busy');}
  });
  document.getElementById('health-download').addEventListener('click',function(){if(report){T.download(report,seo?'learntech-seo-health.txt':'learntech-website-health.txt');T.track('tool_download',tool);}});
  document.getElementById('health-print').addEventListener('click',function(){if(report){T.track('tool_print',tool);window.print();}});
})();
