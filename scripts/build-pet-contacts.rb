# frozen_string_literal: true
# Run from the site bundle after changing pet_contacts.yml or migrating the URL.
require 'yaml'
require 'fileutils'
root = File.expand_path('..', __dir__)
contacts = YAML.safe_load(File.read(File.join(root, '_data/pet_contacts.yml'), encoding: 'UTF-8'))
business = YAML.safe_load(File.read(File.join(root, '_data/pet_business.yml'), encoding: 'UTF-8'))
site = YAML.safe_load(File.read(File.join(root, '_config.yml'), encoding: 'UTF-8'))
origin = business['public_origin'].to_s.empty? ? site['url'] : business['public_origin']
def escape(value)
  value.to_s.gsub('\\', '\\\\').gsub("\n", '\\n').gsub(';', '\\;').gsub(',', '\\,')
end
def fold(line)
  output = ''; count = 0
  line.each_char do |char|
    if count + char.bytesize > 75
      output += "\r\n "; count = 1
    end
    output += char; count += char.bytesize
  end
  output
end
contacts.each do |person|
  slug = person.fetch('slug'); phone = person.fetch('phone')
  abort 'Invalid contact slug/phone' unless slug.match?(/\A[a-z]+\z/) && phone.match?(/\A[1-9]\d{7,14}\z/)
  parts = person.fetch('name').split(' ', 2)
  url = origin + site['baseurl'].to_s + business['base_path'].to_s + "/#{slug}/"
  lines = ['BEGIN:VCARD', 'VERSION:3.0', "N:#{escape(parts[1])};#{escape(parts[0])};;;",
           "FN:#{escape(person['name'])}", 'ORG:PrettiPetz', 'TITLE:Partner',
           "TEL;TYPE=CELL,VOICE:+#{phone}", "URL:#{url}",
           'NOTE:PrettiPetz - Pets and Cages. Confirm availability and collection before purchase.', 'END:VCARD']
  file = File.join(root, 'pets', 'contacts', "#{slug}.vcf")
  FileUtils.mkdir_p(File.dirname(file))
  File.binwrite(file, lines.map { |line| fold(line) }.join("\r\n") + "\r\n")
end
puts "Generated #{contacts.length} PrettiPetz vCards with CRLF and folded lines."
