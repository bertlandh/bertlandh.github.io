(function(root,factory){if(typeof module==='object'&&module.exports)module.exports=factory();else root.LearnTechBrandSnapCore=factory();})(typeof window!=='undefined'?window:globalThis,function(){
  'use strict';
  function logoRect(lw,lh,w,h,percent,position){
    if(![lw,lh,w,h].every(function(n){return Number.isFinite(n)&&n>0;})||!Number.isFinite(percent)||percent<5||percent>40||!['br','bl','tr','tl','center'].includes(position))throw Error('Choose a valid logo size and position.');
    var pad=Math.max(8,Math.round(Math.min(w,h)*.025)),box=Math.min(w,h)*percent/100,scale=box/Math.max(lw,lh),width=lw*scale,height=lh*scale;
    var x=w-width-pad,y=h-height-pad;
    if(position==='bl'||position==='tl')x=pad;if(position==='tr'||position==='tl')y=pad;if(position==='center'){x=(w-width)/2;y=(h-height)/2;}
    return {x:x,y:y,width:width,height:height,pad:pad};
  }
  function textLines(text,width,measure,maxLines){
    if(!Number.isFinite(width)||width<=0||maxLines<1)throw Error('Text area is too small.');
    var lines=[],line='';
    String(text||'').trim().split(/\s+/).filter(Boolean).forEach(function(word){
      if(line&&measure(line+' '+word)<=width){line+=' '+word;return;}
      if(line){lines.push(line);line='';}
      for(var character of Array.from(word)){if(line&&measure(line+character)>width){lines.push(line);line='';}line+=character;}
    });
    if(line)lines.push(line);var truncated=lines.length>maxLines;lines=lines.slice(0,maxLines);
    if(truncated){var last=Array.from(lines[maxLines-1]);while(last.length&&measure(last.join('')+'…')>width)last.pop();lines[maxLines-1]=last.join('')+'…';}
    return {lines:lines,truncated:truncated};
  }
  function stopTracks(stream){if(stream)stream.getTracks().forEach(function(track){track.stop();});}
  return {logoRect:logoRect,textLines:textLines,stopTracks:stopTracks};
});
