(function () {
  'use strict';
  var root=document.querySelector('[data-health-tool]');if(!root)return;
  var T=window.LearnTechTools,form=document.getElementById('health-form'),button=document.getElementById('health-submit'),status=document.getElementById('health-status'),results=document.getElementById('health-results'),report='',started=false;
  function address(value){var u=new URL(/^https?:\/\//i.test(value)?value:'https://'+value);if(!/^https?:$/.test(u.protocol)||u.username||u.password||u.port||u.search||u.hash||!u.hostname.includes('.')||u.hostname.length>253)throw Error('Enter a public page address without a query string, password or custom port.');return u;}
  function render(r){
    var checks=document.getElementById('health-checks');checks.replaceChildren();
    r.checks.forEach(function(c){var el=document.createElement('article');el.className='tool-result';var badge=document.createElement('span');badge.className='tool-badge'+(c.status==='review'?' tool-badge--review':'');badge.textContent=c.status==='review'?'Review suggested':'Observed';el.appendChild(badge);var h=document.createElement('h3');h.textContent=c.label;el.appendChild(h);var p=document.createElement('p');p.textContent=c.detail;el.appendChild(p);if(c.action){var a=document.createElement('p');a.textContent=c.action;el.appendChild(a);}checks.appendChild(el);});
    var count=r.checks.filter(function(c){return c.status==='review';}).length;
    document.getElementById('health-summary').textContent=count+' areas to review';document.getElementById('health-meta').textContent=r.url+' · Checked '+new Date(r.checkedAt).toLocaleString()+(r.cached?' · Cached public report (up to 10 minutes)':'');
    document.getElementById('health-php').textContent=r.php;document.getElementById('health-limitations').textContent=r.limitations;
    document.getElementById('health-pagespeed').href='https://pagespeed.web.dev/analysis?url='+encodeURIComponent(r.url);
    report='LEARNTECH WEBSITE HEALTH SNAPSHOT\nPage: '+r.url+'\nChecked: '+r.checkedAt+'\n'+(r.cached?'Cached report; up to 10 minutes old.\n':'')+'\n'+r.checks.map(function(c){return c.label+' — '+(c.status==='review'?'REVIEW SUGGESTED':'OBSERVED')+'\n'+c.detail+(c.action?'\nNext step: '+c.action:'');}).join('\n\n')+'\n\nPHP: '+r.php+'\nBackups: Not publicly verifiable. Ask when a restore was last tested.\n\n'+r.limitations+'\n\nhttps://learntechfoundation.org/tools/website-health/';
    T.report(report,'website_health');results.hidden=false;document.getElementById('health-results-title').focus();
  }
  form.addEventListener('input',function(){if(!started){T.track('tool_start','website_health');started=true;}results.hidden=true;report='';});
  form.addEventListener('submit',async function(e){
    e.preventDefault();if(!form.reportValidity())return;results.hidden=true;report='';var u;
    try{u=address(form.elements.website.value.trim());}catch(err){status.textContent=err.message;status.classList.add('tool-error');return;}
    status.classList.remove('tool-error');status.textContent='Checking the public page. This may take up to a minute…';button.disabled=true;button.textContent='Checking…';root.setAttribute('aria-busy','true');
    var controller=new AbortController(),timer=setTimeout(function(){controller.abort();},65000);
    try{
      var response=await fetch(root.dataset.api,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({url:u.href,permission:true}),signal:controller.signal,credentials:'omit',referrerPolicy:'no-referrer'});
      var r=await response.json();if(!response.ok||r.error)throw Error(r.error||'The website could not be checked right now.');
      if(!Array.isArray(r.checks)||!r.checks.length||!r.checkedAt)throw Error('The checker returned an incomplete report. Please try again.');
      render(r);status.textContent='Your observations are ready below.';T.track('tool_complete','website_health');
    }catch(err){status.textContent=err.name==='AbortError'?'The check timed out. Try again, use PageSpeed Insights, or ask us for a manual review.':err.message==='Failed to fetch'?'The checker could not be reached. Try again or use the PageSpeed Insights link.':err.message;status.classList.add('tool-error');T.track('tool_error','website_health');}
    finally{clearTimeout(timer);button.disabled=false;button.textContent='Check website basics';root.removeAttribute('aria-busy');}
  });
  document.getElementById('health-download').addEventListener('click',function(){if(report){T.download(report,'learntech-website-health.txt');T.track('tool_download','website_health');}});
  document.getElementById('health-print').addEventListener('click',function(){if(report){T.track('tool_print','website_health');window.print();}});
})();
