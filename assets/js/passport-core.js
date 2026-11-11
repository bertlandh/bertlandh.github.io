(function(root,factory){if(typeof module==='object'&&module.exports)module.exports=factory();else root.LearnTechPassportCore=factory();})(typeof window!=='undefined'?window:globalThis,function(){'use strict';
function layout(w,h,paper,count){
 if(!Number.isFinite(w)||!Number.isFinite(h)||w<20||w>100||h<20||h>100)throw Error('Choose photo dimensions between 20 and 100 mm.');
 if(!['letter','a4'].includes(paper))throw Error('Choose Letter or A4 paper.');
 var pw=paper==='letter'?215.9:210,ph=paper==='letter'?279.4:297,margin=10,gap=4,footer=20;
 var cols=Math.floor((pw-2*margin+gap)/(w+gap)),rows=Math.floor((ph-2*margin-footer+gap)/(h+gap)),max=cols*rows;
 if(count!=='fill'&&(!Number.isInteger(Number(count))||Number(count)<1||Number(count)>max))throw Error('Choose 1–'+max+' copies, or fill the sheet.');
 var n=count==='fill'?max:Number(count),usedCols=Math.min(cols,n),usedRows=Math.ceil(n/cols),x=(pw-(usedCols*w+(usedCols-1)*gap))/2,y=margin;
 return {width:pw,height:ph,photoWidth:w,photoHeight:h,cols:cols,rows:rows,max:max,count:n,gap:gap,x:x,y:y,usedRows:usedRows,positions:Array.from({length:n},function(_,i){return {x:x+(i%cols)*(w+gap),y:y+Math.floor(i/cols)*(h+gap)};})};
}
function crop(sw,sh,w,h,zoom,x,y){
 if(![sw,sh,w,h,zoom,x,y].every(Number.isFinite)||sw<=0||sh<=0||w<=0||h<=0||zoom<1||zoom>3||x<0||x>100||y<0||y>100)throw Error('Invalid crop settings.');
 var scale=Math.max(w/sw,h/sh)*zoom,cw=w/scale,ch=h/scale;return {x:(sw-cw)*x/100,y:(sh-ch)*y/100,width:cw,height:ch};
}
function crc(bytes){var c=0xffffffff;for(var i=0;i<bytes.length;i++){c^=bytes[i];for(var k=0;k<8;k++)c=(c>>>1)^((c&1)?0xedb88320:0);}return (c^0xffffffff)>>>0;}
function png300(buffer){var a=new Uint8Array(buffer);if(a[0]!==137||a[1]!==80)throw Error('Invalid PNG export.');var chunk=new Uint8Array(21),v=new DataView(chunk.buffer);v.setUint32(0,9);chunk.set([112,72,89,115],4);v.setUint32(8,11811);v.setUint32(12,11811);chunk[16]=1;v.setUint32(17,crc(chunk.slice(4,17)));var parts=[a.slice(0,33),chunk];for(var p=33;p<a.length;){var n=new DataView(a.buffer,a.byteOffset+p,4).getUint32(0)+12;if(n>a.length-p)throw Error('Invalid PNG chunk.');if(String.fromCharCode.apply(null,a.slice(p+4,p+8))!=='pHYs')parts.push(a.slice(p,p+n));p+=n;}var out=new Uint8Array(parts.reduce(function(s,b){return s+b.length;},0)),at=0;parts.forEach(function(b){out.set(b,at);at+=b.length;});return out;}
function jamaicaGuides(w,h){return w===35&&h===45?{headroomMinimum:2,headroomBand:[3,4],headTop:3.5,faceHeight:[25,35],chinBand:[28.5,38.5]}:null;}
return {jamaicaGuides:jamaicaGuides,layout:layout,crop:crop,png300:png300,mmToPx:function(mm){return Math.round(mm*300/25.4);}};
});
