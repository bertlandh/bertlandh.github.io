(function (root, factory) {
  if (typeof module === 'object' && module.exports) module.exports = factory();
  else root.LearnTechImageCore = factory();
})(typeof window !== 'undefined' ? window : globalThis, function () {
  'use strict';
  var MAX_FILE = 20 * 1024 * 1024, MAX_SOURCE = 24000000, MAX_OUTPUT = 12000000;
  function validateSource(w,h) { if (!w || !h || w*h > MAX_SOURCE) throw Error('Use a still image up to 24 megapixels.'); }
  function inspect(buffer) {
    var b = new Uint8Array(buffer), v = new DataView(buffer), width, height, mime;
    function text(at,n) { return String.fromCharCode.apply(null,b.slice(at,at+n)); }
    if (b.length > MAX_FILE) throw Error('Choose an image no larger than 20 MB.');
    if (b.length >= 33 && b[0]===137 && text(1,3)==='PNG' && b[4]===13 && b[5]===10 && b[6]===26 && b[7]===10 && text(12,4)==='IHDR') {
      mime='image/png';width=v.getUint32(16);height=v.getUint32(20);
      for (var p=8;p+12<=b.length;) { var n=v.getUint32(p), type=text(p+4,4);if(n>b.length-p-12)throw Error('This PNG file is incomplete.');if(type==='acTL')throw Error('Animated images are not supported. Choose a still image.');if(type==='IDAT')break;p+=12+n; }
    } else if (b.length>=30 && text(0,4)==='RIFF' && text(8,4)==='WEBP') {
      mime='image/webp';var chunk=text(12,4);
      if(chunk==='VP8X'){if(b[20]&2)throw Error('Animated images are not supported. Choose a still image.');width=1+b[24]+(b[25]<<8)+(b[26]<<16);height=1+b[27]+(b[28]<<8)+(b[29]<<16);}
      else if(chunk==='VP8L'&&b[20]===47){width=1+b[21]+((b[22]&63)<<8);height=1+(b[22]>>6)+(b[23]<<2)+((b[24]&15)<<10);}
      else if(chunk==='VP8 '&&b[23]===157&&b[24]===1&&b[25]===42){width=v.getUint16(26,true)&16383;height=v.getUint16(28,true)&16383;}
      else throw Error('This WebP image could not be read. Try a JPEG or PNG.');
    } else if (b.length>=4 && b[0]===255 && b[1]===216) {
      mime='image/jpeg';var at=2;
      while(at+4<=b.length){if(b[at++]!==255)continue;while(b[at]===255)at++;var marker=b[at++];if(marker===217||marker===218)break;if(marker===1||(marker>=208&&marker<=215))continue;if(at+2>b.length)break;var length=v.getUint16(at);if(length<2||at+length>b.length)break;
        if([192,193,194,195,197,198,199,201,202,203,205,206,207].includes(marker)&&length>=8){height=v.getUint16(at+3);width=v.getUint16(at+5);break;}at+=length;}
      if(!width)throw Error('This JPEG file is incomplete or unsupported.');
    } else throw Error('Choose a still JPEG, PNG or WebP image. SVG, GIF and HEIC are not supported.');
    validateSource(width,height);return {width:width,height:height,mime:mime};
  }
  function plan(sw,sh,w,h,fit,upscale,footer) {
    validateSource(sw,sh);
    if(!Number.isInteger(w)||!Number.isInteger(h)||w<320||h<240||w>4096||h>4096||w*h>MAX_OUTPUT)throw Error('Use a width of 320–4096 px and height of 240–4096 px, up to 12 megapixels total.');
    if(!Number.isFinite(footer)||footer<1||footer>=h)throw Error('The canvas is too short for its credit.');
    if(!['contain','cover'].includes(fit))throw Error('Choose a valid image fit.');
    var content=h-footer, scale=(fit==='cover'?Math.max:Math.min)(w/sw,content/sh);
    if(!upscale)scale=Math.min(1,scale);
    return {width:w,height:h,contentHeight:content,drawWidth:sw*scale,drawHeight:sh*scale,x:(w-sw*scale)/2,y:(content-sh*scale)/2};
  }
  function wrap(text,maxWidth,measure) {
    var lines=[],line='';text.split(/\s+/).forEach(function(word){var next=line?line+' '+word:word;if(line&&measure(next)>maxWidth){lines.push(line);line=word;}else line=next;});if(line)lines.push(line);return lines;
  }
  function size(bytes) { return bytes<1024?bytes+' B':bytes<1048576?(bytes/1024).toFixed(1)+' KB':(bytes/1048576).toFixed(2)+' MB'; }
  function filename(name,w,h,mime) { var base=name.replace(/\.[^.]*$/,'').replace(/[^a-z0-9_-]+/gi,'-').replace(/^-+|-+$/g,'').slice(0,60)||'image';return base+'-'+w+'x'+h+'-learntech.'+({'image/jpeg':'jpg','image/png':'png','image/webp':'webp'}[mime]||'png'); }
  return {inspect:inspect,plan:plan,wrap:wrap,size:size,filename:filename,validateSource:validateSource,maxFile:MAX_FILE};
});
