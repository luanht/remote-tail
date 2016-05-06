>
Just a my tiny tool for monitoring logs file in remote servers via browser.

### Why?
Sometime I dont have right access to SSH server, or I want to share the logs to other who have not SSH access.

### Usage
  * NodeJS server:

   ```
   $ npm install
   $ node server.js
   ```

  * Ruby/Sinatra server:

   ```
   $ bundle
   $ ruby server.rb
   ```

### Configuration
See `config.json`:

```JSON
{
  "server": {
    "port": "5000"
  },
  "auth": { // Basic auth
    "username": "me",
    "password": "123456"
  }
}
```

### Warning!
Code just for fun! Should use only in staging or development only.

### Screenshot
![alt text](https://raw.githubusercontent.com/luanht/remote-tail/master/screenshot.png "Screenshot")

### Libraries
* [node-tail](https://github.com/lucagrulla/node-tail)
* [ruby-tail](https://github.com/flori/file-tail)