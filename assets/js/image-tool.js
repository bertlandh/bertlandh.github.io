(function () {
  'use strict';
  var root=document.querySelector('[data-image-tool]');if(!root)return;
  var T=window.LearnTechTools,C=window.LearnTechImageCore,form=document.getElementById('image-form'),fileInput=document.getElementById('image-file'),preset=document.getElementById('image-preset'),wInput=document.getElementById('image-width'),hInput=document.getElementById('image-height'),format=document.getElementById('image-format'),quality=document.getElementById('image-quality'),transparent=document.getElementById('image-transparent'),generate=document.getElementById('image-generate'),download=document.getElementById('image-download'),result=document.getElementById('image-result'),status=document.getElementById('image-status');
  var source=null,sourceURL='',resultURL='',output=null,version=0,loadVersion=0,started=false;
  var presets={web:[1200,800],square:[1080,1080],portrait:[1080,1350],story:[1080,1920],landscape:[1200,630]};
  function say(text,error){status.textContent=text;status.classList.toggle('tool-error',!!error);}
  function invalidate(keep){version++;output=null;download.disabled=true;if(keep&&!result.hidden){result.setAttribute('data-preview-stale','');return;}result.removeAttribute('data-preview-stale');result.hidden=true;document.getElementById('image-preview').removeAttribute('src');if(resultURL){URL.revokeObjectURL(resultURL);resultURL='';}}
  function releaseSource(){if(source&&source.image.close)source.image.close();source=null;if(sourceURL){URL.revokeObjectURL(sourceURL);sourceURL='';}document.getElementById('image-original').removeAttribute('src');document.getElementById('image-source').hidden=true;}
  function controls(){quality.disabled=format.value==='image/png';transparent.disabled=format.value==='image/jpeg';document.getElementById('image-quality-value').textContent=Math.round(Number(quality.value)*100)+'%';}
  function footer(ctx,width){
    var font=Math.max(10,Math.round(width/80)),lineHeight=Math.ceil(font*1.45);ctx.font=font+'px Arial, sans-serif';
    var lines=C.wrap(T.creditText('image_tools').split('\n')[0],width-24,function(t){return ctx.measureText(t).width;}).concat(C.wrap('Website design: learntechfoundation.org',width-24,function(t){return ctx.measureText(t).width;}));
    return {font:font,lineHeight:lineHeight,lines:lines,height:lines.length*lineHeight+24};
  }
  function proportional(){if(preset.value!=='proportional'||!source)return;var width=Number(wInput.value);if(!Number.isInteger(width)||width<320||width>4096)return;var ctx=document.createElement('canvas').getContext('2d');var f=footer(ctx,width);hInput.value=Math.max(240,Math.round(width*source.height/source.width)+f.height);}
  async function decode(blob){
    if(window.createImageBitmap){try{return await createImageBitmap(blob,{imageOrientation:'from-image'});}catch(_){/* Fall back for browser/codec differences. */}}
    return new Promise(function(resolve,reject){var img=new Image(),url=URL.createObjectURL(blob),timer=setTimeout(function(){img.src='';URL.revokeObjectURL(url);reject(Error('Image decoding timed out. Try a smaller image.'));},20000);img.onload=function(){clearTimeout(timer);URL.revokeObjectURL(url);resolve(img);};img.onerror=function(){clearTimeout(timer);URL.revokeObjectURL(url);reject(Error('This image could not be decoded. Try a different JPEG, PNG or WebP.'));};img.src=url;});
  }
  fileInput.addEventListener('change',async function(){
    invalidate();releaseSource();generate.disabled=true;var decodeToken=++loadVersion,file=this.files[0];if(!file){say('Choose an image to begin.');return;}
    say('Reading your image on this device…');
    try{if(file.size>C.maxFile)throw Error('Choose an image no larger than 20 MB.');var bytes=await file.arrayBuffer(),info=C.inspect(bytes),blob=new Blob([bytes],{type:info.mime}),img=await decode(blob);
      if(decodeToken!==loadVersion){if(img.close)img.close();return;}
      var width=img.naturalWidth||img.width,height=img.naturalHeight||img.height;C.validateSource(width,height);source={image:img,width:width,height:height,size:file.size,name:file.name};sourceURL=URL.createObjectURL(blob);document.getElementById('image-original').src=sourceURL;document.getElementById('image-source').hidden=false;document.getElementById('image-source-info').textContent=width+' × '+height+' px · '+C.size(file.size);if(preset.value==='proportional')wInput.value=Math.max(320,Math.min(1200,width));proportional();generate.disabled=false;say('Image ready. Choose your size and format, then create a preview.');if(!started){T.track('tool_start','image_tools');started=true;}
    }catch(e){if(decodeToken!==loadVersion)return;releaseSource();say(e.message||'This image could not be opened.',true);T.track('tool_error','image_tools');}
  });
  preset.addEventListener('change',function(){invalidate(true);hInput.readOnly=this.value==='proportional';if(presets[this.value]){wInput.value=presets[this.value][0];hInput.value=presets[this.value][1];}proportional();say('Settings changed. Create a new preview to update the download.');});
  form.addEventListener('input',function(e){if(e.target===fileInput)return;invalidate(true);if(e.target===wInput&&presets[preset.value]){preset.value='custom';hInput.readOnly=false;}if(e.target===hInput&&preset.value!=='proportional')preset.value='custom';controls();proportional();say('Settings changed. Create a new preview to update the download.');});
  form.addEventListener('submit',async function(e){
    e.preventDefault();if(!source||!form.reportValidity())return;invalidate();var token=version,canvas=document.createElement('canvas'),ctx=canvas.getContext('2d');generate.disabled=true;say('Creating your image on this device…');
    try{proportional();var width=Number(wInput.value),height=Number(hInput.value),f=footer(ctx,width),p=C.plan(source.width,source.height,width,height,form.elements.fit.value,form.elements.enlarge.checked,f.height);canvas.width=width;canvas.height=height;
      if(format.value==='image/jpeg'||!transparent.checked){ctx.fillStyle='#ffffff';ctx.fillRect(0,0,width,height);}ctx.imageSmoothingEnabled=true;ctx.imageSmoothingQuality='high';ctx.save();ctx.beginPath();ctx.rect(0,0,width,p.contentHeight);ctx.clip();ctx.drawImage(source.image,p.x,p.y,p.drawWidth,p.drawHeight);ctx.restore();
      ctx.fillStyle='#ffffff';ctx.fillRect(0,p.contentHeight,width,f.height);ctx.fillStyle='#981430';ctx.fillRect(0,p.contentHeight,width,2);ctx.fillStyle='#655d60';ctx.font=f.font+'px Arial, sans-serif';ctx.textBaseline='top';f.lines.forEach(function(line,i){ctx.fillText(line,12,p.contentHeight+12+i*f.lineHeight);});
      var mime=format.value,blob=await new Promise(function(resolve,reject){canvas.toBlob(function(b){b?resolve(b):reject(Error('The browser could not export this image. Try a smaller size.'));},mime,Number(quality.value));});
      if(token!==version)return;if(blob.type!==mime)throw Error('This browser cannot export that format. Choose JPEG or PNG.');output={blob:blob,name:C.filename(source.name,width,height,mime)};resultURL=URL.createObjectURL(blob);var preview=document.getElementById('image-preview');preview.src=resultURL;preview.width=width;preview.height=height;
      var change=(1-blob.size/source.size)*100,comparison=change>=0?change.toFixed(1)+'% smaller':Math.abs(change).toFixed(1)+'% larger';document.getElementById('image-output-info').textContent=width+' × '+height+' px · '+C.size(blob.size)+' · '+comparison+' than the original';result.hidden=false;download.disabled=false;say('Your image is ready. The LearnTech credit is included in the final canvas.');T.track('tool_complete','image_tools');document.getElementById('image-result-title').focus();
    }catch(err){if(token===version){say(err.message||'The image could not be processed. Try a smaller size.',true);T.track('tool_error','image_tools');}}
    finally{canvas.width=1;canvas.height=1;generate.disabled=!source;}
  });
  download.addEventListener('click',function(){if(!output)return;T.download(output.blob,output.name,output.blob.type);T.track('tool_download','image_tools');});
  document.getElementById('image-clear').addEventListener('click',function(){loadVersion++;invalidate();releaseSource();fileInput.value='';generate.disabled=true;say('Image removed. Choose another image to begin.');});
  document.getElementById('image-tool-credit').innerHTML=T.creditHTML('image_tools');controls();hInput.readOnly=true;
})();
