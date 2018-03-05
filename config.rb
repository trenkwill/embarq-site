activate :autoprefixer do |prefix|
  prefix.browsers = "last 2 versions"
end

activate :sprockets

page '/*.xml', layout: false
page '/*.json', layout: false
page '/*.txt', layout: false

configure :build do
  activate :minify_css
  activate :minify_javascript
  activate :minify_html, remove_input_attributes: false
  activate :asset_hash
  activate :relative_assets
  set :relative_links, true
end

activate :deploy do |deploy|
  deploy.build_before = true
  deploy.deploy_method = :git
end

# Use “pretty” URLs (without the `.html` suffix)
activate :directory_indexes

#pencrypts email links on my app
activate :protect_emails

#config sitemap
set :url_root, 'https://www.embarq.fr'

activate :search_engine_sitemap

# activate :google_analytics do |ga|
#   # Property ID (default = nil)
#     ga.tracking_id = 'UA-114918357-1'
#   end

