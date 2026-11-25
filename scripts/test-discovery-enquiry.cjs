"use strict";
const assert = require("node:assert/strict");
const fs = require("node:fs"), path = require("node:path"), vm = require("node:vm");
const root = path.resolve(__dirname, "..");
const source = fs.readFileSync(path.join(root, "assets/js/enquiry-context.js"), "utf8");
function run(query) {
  let onChange;
  const fields = {
    enquiry_type: {value: "unsure", addEventListener(event, callback) { onChange = callback; }},
    requested_product: {value: "", disabled: true, required: false},
    _subject: {value: "LearnTech project or product enquiry"},
    contact_request: {checked: false}
  };
  for (const name of ["name", "business", "email", "phone", "website", "message"]) fields[name] = {value: ""};
  fields.namedItem = name => fields[name] || null;
  const answers = [{value: "Our existing workflow notes", disabled: false}, {value: "Two hours of rework", disabled: false}];
  const panel = {hidden: false, querySelectorAll() { return answers; }};
  const label = {textContent: ""}, productPanel = {hidden: true};
  const form = {elements: fields, querySelector() { return productPanel; }};
  const document = {
    querySelector() { return form; },
    querySelectorAll(selector) {
      if (selector === "[data-lt-discovery-fields]") return [panel];
      if (selector === "[data-lt-message-label]") return [label];
      return [];
    }
  };
  vm.runInNewContext(source, {document, location: {search: query}, URLSearchParams, URL});
  return {fields, answers, panel, label, productPanel, change(value) { fields.enquiry_type.value = value; onChange(); }};
}
const service = run("");
assert.equal(service.panel.hidden, false);
assert.ok(service.answers.every(a => !a.disabled));
assert.equal(service.fields.message.value, "");
assert.equal(service.fields.contact_request.checked, false);
service.change("books");
assert.equal(service.panel.hidden, true);
assert.ok(service.answers.every(a => a.disabled));
assert.equal(service.fields.business.required, false);
assert.equal(service.label.textContent, "What would you like to ask?");
service.change("consultancy");
assert.equal(service.panel.hidden, false);
assert.ok(service.answers.every(a => !a.disabled));
assert.equal(service.answers[0].value, "Our existing workflow notes");
assert.equal(service.fields.business.required, true);
const product = run("?interest=product&product=custodia");
assert.equal(product.productPanel.hidden, false);
assert.equal(product.fields.requested_product.required, true);
assert.equal(product.panel.hidden, true);
assert.ok(product.answers.every(a => a.disabled));
const book = run("?interest=books&book=cbg");
assert.ok(book.fields.message.value.includes("Chicken Back Gravy"));
assert.equal(book.panel.hidden, true);
assert.equal(book.fields.contact_request.checked, false);
console.log("Discovery enquiries passed: service questions active; book/product questions excluded from submission; returning to services preserves answers; consent stays unchecked.");
