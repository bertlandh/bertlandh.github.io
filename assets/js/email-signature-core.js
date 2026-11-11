(function(root){'use strict';
function escape(s){return String(s||'').replace(/[&<>"']/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c];});}
function url(s){if(!s)return '';try{var u=new URL(/^https?:\/\//i.test(s)?s:'https://'+s);return u.protocol==='https:'&&!u.username&&!u.password?u.href:'';}catch(_){return '';}}
function build(d){
 var color=/^#[0-9a-f]{6}$/i.test(d.color)?d.color:'#981430',layout=['simple','logo','photo'].includes(d.layout)?d.layout:'simple';
 var website=url(d.website),image=url(d.image),cta=url(d.ctaUrl),socials=['linkedin','instagram','facebook','youtube','whatsapp'];
 if(d.email&&!/^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+$/.test(d.email))throw Error('Enter a valid email address.');
 ['website','image','ctaUrl'].concat(socials).forEach(function(k){if(d[k]&&!url(d[k]))throw Error('Use a public HTTPS address for '+k+'.');});
 function link(h,t){return '<a href="'+escape(h)+'" style="color:'+color+';text-decoration:none">'+escape(t)+'</a>';}
 var lines=[],plain=[d.name,d.role,d.business,d.tagline].filter(Boolean);
 if(d.phone){var tel=d.phone.replace(/[^+0-9]/g,'');if(!/^\+?\d{7,15}$/.test(tel))throw Error('Enter a phone number with 7–15 digits, optionally starting with +.');lines.push(link('tel:'+tel,d.phone));plain.push(d.phone);}
 if(d.email){lines.push(link('mailto:'+d.email,d.email));plain.push(d.email);}
 if(website){lines.push(link(website,d.website));plain.push(website);}
 var socialLinks=[],socialLabels={linkedin:'LinkedIn',instagram:'Instagram',facebook:'Facebook',youtube:'YouTube',whatsapp:'WhatsApp'};
 socials.forEach(function(k){var u=url(d[k]);if(u){socialLinks.push('<a href="'+escape(u)+'" style="display:inline-block;white-space:nowrap;color:'+color+';text-decoration:none;font-size:13px;line-height:24px;margin:0 10px 4px 0"><img src="https://learntechfoundation.org/img/signature-social/'+k+'.png?v=1" width="16" height="16" alt="" style="display:inline-block;width:16px;height:16px;vertical-align:middle;border:0;margin-right:4px">'+socialLabels[k]+'</a>');plain.push(socialLabels[k]+': '+u);}});
 var details='<strong style="font-size:18px;color:'+color+'">'+escape(d.name)+'</strong>';
 if(d.role)details+='<br>'+escape(d.role);
 if(d.business)details+='<br>'+escape(d.business);
 if(d.tagline)details+='<br>'+escape(d.tagline);
 if(lines.length)details+='<br>'+lines.join('<br>');
 if(socialLinks.length)details+='<div style="padding-top:8px;line-height:24px">'+socialLinks.join(' ')+'</div>';
 if(cta&&d.ctaLabel){details+='<div style="padding-top:8px">'+link(cta,d.ctaLabel)+'</div>';plain.push(d.ctaLabel+': '+cta);}
 var credit='Made with love by your friends at LearnTech Foundation.';
 var footer='<span style="font-size:11px;color:#666">'+credit+'<br>'+link('https://learntechfoundation.org/services/business-websites/','Need a website? Contact LearnTech')+'</span>';
 var alignment=['left','center','right'].includes(d.alignment)?d.alignment:'left';
 var position=['left','right','top'].includes(d.position)?d.position:'right',hasImage=layout!=='simple'&&image,imageWidth=d.imageSize==null||d.imageSize===''?(layout==='logo'?136:88):Number(d.imageSize);
 if(!Number.isInteger(imageWidth)||imageWidth<40||imageWidth>200)throw Error('Choose an image width from 40 to 200 pixels.');
 var imageColumn=Math.max(16,Math.min(44,Math.round((imageWidth+16)/480*100)))+'%',imageMargin=position==='top'?(alignment==='left'?'0 auto 0 0':alignment==='right'?'0 0 0 auto':'0 auto'):'0 auto';
 var img='<img src="'+escape(image)+'" width="'+imageWidth+'" alt="'+escape(layout==='photo'?d.name:d.business||'Business logo')+'" style="display:block;width:'+imageWidth+'px;max-width:100%;height:auto;margin:'+imageMargin+';'+(layout==='photo'?'border-radius:50%;':'')+'">';
 var detailsCell='<td align="'+alignment+'" valign="middle" style="text-align:'+alignment+';overflow-wrap:anywhere;word-break:break-word">'+details+'</td>',row=detailsCell;
 if(hasImage){var imageCell='<td width="'+imageColumn+'" align="center" valign="middle" style="width:'+imageColumn+';padding:'+(position==='left'?'0 16px 0 0':'0 0 0 16px')+'">'+img+'</td>';row=position==='top'?'<td><table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%"><tr><td align="'+alignment+'" style="text-align:'+alignment+';padding:0 0 16px">'+img+'</td></tr><tr>'+detailsCell+'</tr></table></td>':position==='left'?imageCell+detailsCell:detailsCell+imageCell;}
 var html='<table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="width:100%;font-family:Arial,sans-serif;font-size:14px;line-height:1.5;color:#333;max-width:480px;margin:'+(alignment==='center'?'0 auto':alignment==='right'?'0 0 0 auto':'0 auto 0 0')+';table-layout:fixed;overflow-wrap:anywhere;word-break:break-word"><tr>'+row+'</tr><tr><td colspan="'+(hasImage&&position!=='top'?'2':'1')+'" align="'+alignment+'" style="text-align:'+alignment+';padding-top:18px">'+footer+'</td></tr></table>';
 plain.push('',credit,'Need a website? https://learntechfoundation.org/services/business-websites/');
 return {html:html,text:plain.join('\n'),document:'<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Email signature</title></head><body>'+html+'</body></html>'};
}
var api={build:build,url:url};if(typeof module==='object'&&module.exports)module.exports=api;else root.LearnTechSignatureCore=api;
})(typeof window!=='undefined'?window:this);
