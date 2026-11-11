(function(root){'use strict';
function escape(s){return String(s||'').replace(/[&<>"']/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c];});}
function url(s){if(!s)return '';try{var u=new URL(/^https?:\/\//i.test(s)?s:'https://'+s);return u.protocol==='https:'&&!u.username&&!u.password?u.href:'';}catch(_){return '';}}
function build(d){
 var color=/^#[0-9a-f]{6}$/i.test(d.color)?d.color:'#981430',layout=['simple','logo','photo'].includes(d.layout)?d.layout:'simple';
 var website=url(d.website),image=url(d.image),cta=url(d.ctaUrl),socials=['linkedin','instagram','facebook','youtube','whatsapp'];
 if(d.email&&!/^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+$/.test(d.email))throw Error('Enter a valid email address.');
 ['website','image','ctaUrl'].concat(socials).forEach(function(k){if(d[k]&&!url(d[k]))throw Error('Use a public HTTPS address for '+k+'.');});
 function link(h,t){return '<a href="'+escape(h)+'" style="color:'+color+';text-decoration:none">'+escape(t)+'</a>';}
 var lines=[],plain=[d.name,[d.role,d.business].filter(Boolean).join(' · '),d.tagline].filter(Boolean);
 if(d.phone){var tel=d.phone.replace(/[^+0-9]/g,'');if(!/^\+?\d{7,15}$/.test(tel))throw Error('Enter a phone number with 7–15 digits, optionally starting with +.');lines.push(link('tel:'+tel,d.phone));plain.push(d.phone);}
 if(d.email){lines.push(link('mailto:'+d.email,d.email));plain.push(d.email);}
 if(website){lines.push(link(website,d.website));plain.push(website);}
 socials.forEach(function(k){var u=url(d[k]);if(u){lines.push(link(u,k==='whatsapp'?'WhatsApp':k.charAt(0).toUpperCase()+k.slice(1)));plain.push(k+': '+u);}});
 var details='<strong style="font-size:18px;color:'+color+'">'+escape(d.name)+'</strong><br>'+escape([d.role,d.business].filter(Boolean).join(' · '));
 if(d.tagline)details+='<br>'+escape(d.tagline);
 if(lines.length)details+='<br>'+lines.join('<br>');
 if(cta&&d.ctaLabel){details+='<br><br>'+link(cta,d.ctaLabel);plain.push(d.ctaLabel+': '+cta);}
 var credit='Made with love by your friends at LearnTech Foundation.';
 var footer='<span style="font-size:11px;color:#666">'+credit+'<br>'+link('https://learntechfoundation.org/services/business-websites/','Need a website? Contact LearnTech')+'</span>';
 var position=['left','right','top'].includes(d.position)?d.position:'right',hasImage=layout!=='simple'&&image,imageWidth=layout==='logo'?136:88;
 var img='<img src="'+escape(image)+'" width="'+imageWidth+'" alt="'+escape(layout==='photo'?d.name:d.business||'Business logo')+'" style="display:block;width:'+imageWidth+'px;max-width:100%;height:auto;margin:0 auto;'+(layout==='photo'?'border-radius:50%;':'')+'">';
 var detailsCell='<td valign="middle" style="overflow-wrap:anywhere;word-break:break-word">'+details+'</td>',row=detailsCell;
 if(hasImage){var imageCell='<td width="'+(layout==='logo'?'32%':'24%')+'" align="center" valign="middle" style="width:'+(layout==='logo'?'32%':'24%')+';padding:'+(position==='left'?'0 16px 0 0':'0 0 0 16px')+'">'+img+'</td>';row=position==='top'?'<td><table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%"><tr><td align="center" style="padding:0 0 16px">'+img+'</td></tr><tr>'+detailsCell+'</tr></table></td>':position==='left'?imageCell+detailsCell:detailsCell+imageCell;}
 var html='<table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="width:100%;font-family:Arial,sans-serif;font-size:14px;line-height:1.5;color:#333;max-width:480px;table-layout:fixed;overflow-wrap:anywhere;word-break:break-word"><tr>'+row+'</tr><tr><td colspan="'+(hasImage&&position!=='top'?'2':'1')+'" style="padding-top:18px">'+footer+'</td></tr></table>';
 plain.push('',credit,'Need a website? https://learntechfoundation.org/services/business-websites/');
 return {html:html,text:plain.join('\n'),document:'<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Email signature</title></head><body>'+html+'</body></html>'};
}
var api={build:build,url:url};if(typeof module==='object'&&module.exports)module.exports=api;else root.LearnTechSignatureCore=api;
})(typeof window!=='undefined'?window:this);
