(function(){'use strict';
function ready(){
 var target=document.getElementById('tool-start')||document.getElementById('tools-list');
 var navigation=window.performance&&performance.getEntriesByType?performance.getEntriesByType('navigation')[0]:null;
 if(target&&(!location.hash||location.hash==='#'+target.id)&&(!navigation||navigation.type!=='back_forward')){if(!location.hash)history.replaceState(history.state,'',location.pathname+location.search+'#'+target.id);target.scrollIntoView({block:'start',behavior:'instant'});}
 document.querySelectorAll('[data-tool-follow]').forEach(function(panel){
  var slot=panel.parentElement,grid=slot.closest('.tool-follow-grid'),form=grid&&grid.querySelector('form');if(!form)return;
  var generate=form.querySelector('[type="submit"]'),viewport=document.createElement('div'),body=document.createElement('div'),frame=0;
  viewport.className='tool-follow-viewport';body.className='tool-follow-content';
  Array.from(panel.children).forEach(function(child){if(!child.matches('h2,.tool-actions'))body.appendChild(child);});
  viewport.appendChild(body);var actions=panel.querySelector('.tool-actions');panel.insertBefore(viewport,actions||null);
  var notice=document.createElement('p');notice.className='tool-note tool-follow-stale';notice.textContent='Settings changed. Update the preview before downloading.';notice.hidden=true;panel.insertBefore(notice,viewport);
  var refresh=document.createElement('button');refresh.type='button';refresh.className='site-button site-button--outline tool-follow-refresh';refresh.textContent='Update preview';refresh.hidden=true;if(actions)actions.prepend(refresh);refresh.addEventListener('click',function(){form.requestSubmit(generate);});
  var empty=document.createElement('section');empty.className='tool-panel tool-follow-empty';var heading=document.createElement('h2'),help=document.createElement('p');heading.textContent='Your preview';help.textContent='Choose your settings and create a preview. It will stay beside the form on wider screens.';empty.append(heading,help);slot.insertBefore(empty,panel);
  function fit(){frame=0;empty.hidden=!panel.hidden;if(panel.hidden)return;var stale=panel.hasAttribute('data-preview-stale');notice.hidden=!stale;refresh.hidden=!stale;refresh.disabled=!generate||generate.disabled;
   body.style.transform='none';viewport.style.height='auto';var natural=Math.max(1,body.offsetHeight),scale=1;
   if(matchMedia('(min-width:901px)').matches){var chrome=panel.getBoundingClientRect().height-viewport.getBoundingClientRect().height,top=parseFloat(getComputedStyle(panel).top)||104,available=Math.max(40,innerHeight-top-chrome-16);scale=Math.min(1,available/natural);}
   body.style.transform=scale<1?'scale('+scale+')':'none';viewport.style.height=Math.ceil(natural*scale)+'px';
  }
  function request(){if(!frame)frame=requestAnimationFrame(fit);}
  new MutationObserver(request).observe(panel,{attributes:true,attributeFilter:['hidden','data-preview-stale']});
  if(generate)new MutationObserver(request).observe(generate,{attributes:true,attributeFilter:['disabled']});
  if(window.ResizeObserver)new ResizeObserver(request).observe(body);
  body.addEventListener('load',request,true);window.addEventListener('resize',request);request();
 });
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',ready);else ready();
})();
