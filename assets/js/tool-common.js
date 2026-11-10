(function () {
  'use strict';
  var creditLine = 'Made with love by your friends at LearnTech Foundation.';
  var credits = {
    image_tools: {label:'Contact us for website design', path:'/services/business-websites/?interest=new#enquiry'},
    invoice_quotation: {label:'Contact us for custom software design', path:'/services/software-development/?interest=software#enquiry'},
    website_health: {label:'Contact us for website design', path:'/services/business-websites/?interest=new#enquiry'},
    seo_health: {label:'Contact us for website maintenance and updates', path:'/services/business-websites/?interest=review#enquiry'}
  };
  function creditInfo(tool) { return Object.prototype.hasOwnProperty.call(credits,tool) ? credits[tool] : credits.invoice_quotation; }
  function creditText(tool) { var c=creditInfo(tool); return creditLine+'\n'+c.label+': https://learntechfoundation.org'+c.path+'\nEmail: bertlandhope@gmail.com'; }
  function brandedReport(text, tool) { var credit=creditText(tool); return text.endsWith(credit) ? text : text+'\n\n'+credit; }
  function creditHTML(tool) {
    var c=creditInfo(tool), id=Object.prototype.hasOwnProperty.call(credits,tool)?tool:'invoice_quotation';
    return '<div class="tool-credit" role="note"><p>'+creditLine+'</p><p><a data-lt-event="tool_credit_click" data-lt-tool="'+id+'" data-lt-placement="output_footer" href="https://learntechfoundation.org'+c.path+'">'+c.label+'</a> · <a href="mailto:bertlandhope@gmail.com">bertlandhope@gmail.com</a></p></div>';
  }
  function track(name, tool) { if (window.LearnTechEvents) window.LearnTechEvents.track(name, {tool: tool}); }
  function download(text, name, type) {
    var u = URL.createObjectURL(new Blob([text], {type: type || 'text/plain;charset=utf-8'}));
    var a = document.createElement('a'); a.href = u; a.download = name; document.body.appendChild(a); a.click(); a.remove(); setTimeout(function () { URL.revokeObjectURL(u); }, 1000);
  }
  function report(text, tool) {
    if (!text.trim()) return;
    text = brandedReport(text, tool);
    var section = document.querySelector('[data-tool-email]'); if (!section) return;
    section.hidden = false; section.querySelector('[data-report-preview]').textContent = text;
    var f = section.querySelector('form'); f.elements.message.value = text; f.elements.tool.value = tool;
    f.elements._subject.value = tool === 'seo_health' ? 'LearnTech SEO health report' : tool === 'website_health' ? 'LearnTech website health report' : 'LearnTech invoice or quotation copy';
  }
  document.addEventListener('submit', function (e) {
    if (e.target.matches('[data-tool-report-form]')) {
      if (e.defaultPrevented) return;
      if (!e.target.elements.message.value.trim()) { e.preventDefault(); return; }
      track('tool_report_request', e.target.elements.tool.value);
    }
  });
  window.LearnTechTools = {track: track, download: download, report: report, creditText: creditText, creditHTML: creditHTML, brandedReport: brandedReport,
    escape: function (value) { return String(value == null ? '' : value).replace(/[&<>"']/g, function (c) { return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]; }); }};
})();
