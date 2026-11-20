# frozen_string_literal: true
# Run with the existing bundle: bundle exec ruby scripts/check-pet-business.rb
# Add --launch to fail for missing verified business content.
require 'yaml'
require 'uri'
require 'cgi'
require 'bigdecimal'

root = File.expand_path('..', __dir__)
data = YAML.safe_load(File.read(File.join(root, '_data/pet_business.yml')))
errors = []
blockers = []
def check(condition, message, errors)
  errors << message unless condition
end
check(data['name'] == 'PrettiPetz', 'Business name must be confirmed', errors)
number = data['whatsapp'].to_s
check(number.empty? || number.match?(/\A[1-9]\d{7,14}\z/), 'WhatsApp must be international digits only', errors)
%w[whatsapp location collection_details hours].each do |key|
  blockers << "Business setting missing: #{key}" if data[key].to_s.strip.empty?
end
blockers << 'Opening flag is not enabled' unless data['launch_ready'] == true
blockers << 'Payment, collection, after-sales and privacy policies need owner approval' unless data['policies_approved'] == true
references = []
published = []
Dir.glob(File.join(root, '_pet_listings', '*.md')).each do |file|
  text = File.read(file)
  front = YAML.safe_load(text.split(/^---\s*$\n?/, 3)[1] || '')
  next if front['published'] == false
  published << file
  check(front['verified'] == true, "Unverified published listing: #{file}", errors)
  %w[title category species reference summary price_unit care sourcing permit_information collection_information].each do |key|
    check(!front[key].to_s.strip.empty?, "Missing #{key}: #{file}", errors)
  end
  check(%w[birds eggs supplies].include?(front['category']), "Invalid category: #{file}", errors)
  check(%w[available reserved unavailable].include?(front['availability']), "Invalid availability: #{file}", errors)
  check(front['price_jmd'].is_a?(Numeric) && front['price_jmd'] > 0, "Missing/invalid JMD price: #{file}", errors)
  check(!references.include?(front['reference']), "Duplicate product reference: #{file}", errors)
  references << front['reference']
  photos = front['photos']
  check(photos.is_a?(Array) && !photos.empty?, "Missing actual listing photos: #{file}", errors)
  Array(photos).each do |photo|
    src = photo['src'].to_s
    check(src.start_with?(data['base_path'].to_s + '/assets/inventory/'), "Photo must use local inventory assets: #{file}", errors)
    check(File.file?(File.join(root, src.sub(%r{\A/}, ''))), "Missing photo: #{src}", errors)
    check(!photo['alt'].to_s.strip.empty?, "Missing photo alt text: #{file}", errors)
  end
  if front['category'] == 'eggs'
    check(!front['egg_information'].to_s.strip.empty?, "Missing egg information: #{file}", errors)
  end
end
blockers << 'No verified published inventory' if published.empty?
built = File.join(root, '_site')
pages = Dir.glob(File.join(built, 'pets', '**', '*.html'))
check(pages.length >= 7, 'Build the site first: expected at least seven pet pages', errors)
pages.each do |file|
  html = File.read(file)
  check(!html.match?(/LearnTech|googletagmanager|G-JJ6E4L6716/), "Host branding/tracking leaked: #{file}", errors)
  check(!html.match?(/\{%|\{\{/), "Unrendered Liquid: #{file}", errors)
  check(html.include?('rel="canonical"'), "Missing canonical: #{file}", errors)
  check(html.include?('content="noindex, nofollow"'), "Missing prelaunch noindex: #{file}", errors) unless data['launch_ready']
  html.scan(/(?:href|src)="([^"]+)"/).flatten.each do |raw|
    url = CGI.unescapeHTML(raw)
    next unless url.start_with?('/')
    path = URI::DEFAULT_PARSER.unescape(url.split(/[?#]/).first)
    target = File.join(built, path.sub(%r{\A/}, ''))
    target = File.join(target, 'index.html') if File.directory?(target)
    check(File.file?(target), "Broken local URL #{url} in #{file}", errors)
  end
end
check(!File.exist?(File.join(built, 'PET-BUSINESS.md')), 'Operations documentation exposed in build', errors)
check(!Dir.glob(File.join(built, 'pets', '**', '*listing-template*')).any?, 'Unpublished template exposed', errors)
sitemap = File.read(File.join(built, 'sitemap.xml'))
check(!sitemap.include?('/pets/'), 'Prelaunch pet pages leaked into sitemap', errors) unless data['launch_ready']
puts "Checked #{pages.length} built pages and #{published.length} published listings."
puts "Launch blockers:\n- #{blockers.join("\n- ")}"
errors.concat(blockers) if ARGV.include?('--launch')
abort(errors.join("\n")) unless errors.empty?
puts 'Prelaunch checks passed. This is not approval to open for orders.'
