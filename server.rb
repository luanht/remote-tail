ROOT_DIR    = File.expand_path("..", __FILE__)

require 'rubygems'
require 'bundler/setup'
require 'json'
require 'sinatra'
require 'sinatra/basic_auth'
Bundler.require

config = JSON.parse File.read(File.join(ROOT_DIR, 'config.json'))

authorize do |username, password|
  username == config["auth"]["username"] && password == config["auth"]["password"]
end

configure do
  set :bind, config["server"]["bind"]
  set :port, config["server"]["port"]
end

protect do
  # Index
  get '/' do
    IO.read(ROOT_DIR + '/index.html')
  end

  # Watching
  get '/watch' do
    headers \
      "Content-Type"  => "text/event-stream",
      "Cache-Control" => "no-cache",
      "Connection"    => "keep-alive"

    watchFile = request["file"]
    stream do |out|
      out << "retry: 10000\n\n"

      if File::readable?(watchFile)
        File.open(watchFile) do |file|
          file.extend(File::Tail)
          file.backward(0)
          file.interval = 0.01
          file.tail do |line|
            out << "data: " << line << "\n\n"
          end
        end
      else
        out << "event: exception\n"
        out << "data: {\"message\": \"File is not exists or unreadable\"}\n\n"
      end
    end
  end
end
