(function () {
  'use strict';
  function track(name, tool) { if (window.LearnTechEvents) window.LearnTechEvents.track(name, {tool: tool}); }
  function download(text, name, type) {
    var u = URL.createObjectURL(new Blob([text], {type: type || 'text/plain;charset=utf-8'}));
    var a = document.createElement('a'); a.href = u; a.download = name; document.body.appendChild(a); a.click(); a.remove(); setTimeout(function () { URL.revokeObjectURL(u); }, 1000);
  }
  function report(text, tool) {
    var section = document.querySelector('[data-tool-email]'); if (!section) return;
    section.hidden = false; section.querySelector('[data-report-preview]').textContent = text;
    var f = section.querySelector('form'); f.elements.message.value = text; f.elements.tool.value = tool;
    f.elements._subject.value = tool === 'website_health' ? 'LearnTech website health report' : 'LearnTech invoice or quotation copy';
  }
  document.addEventListener('submit', function (e) {
    if (e.target.matches('[data-tool-report-form]')) {
      if (e.defaultPrevented) return;
      if (!e.target.elements.message.value.trim()) { e.preventDefault(); return; }
      track('tool_report_request', e.target.elements.tool.value);
    }
  });
  window.LearnTechTools = {track: track, download: download, report: report,
    escape: function (value) { return String(value == null ? '' : value).replace(/[&<>"']/g, function (c) { return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]; }); }};
})();
