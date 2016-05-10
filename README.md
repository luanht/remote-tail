>
Just a my tiny tool for monitoring logs file in remote servers via browser.

### Usage
It can be use for tail any files in system as long as they are readable.

You can choose either NodeJs(Recommened) or Ruby server.

  * NodeJS:

   ```
   $ npm install
   $ node server.js
   ```

  * Ruby/Sinatra:

   ```
   $ bundle
   $ ruby server.rb
   ```

### Configuration
See `config.json`:

```JSON
{
  "server": {
    "bind": "0.0.0.0",
    "port": "5000"
  },
  "auth": {
    "username": "me",
    "password": "123456"
  }
}
```

### Screenshot
![Screenshot](https://raw.githubusercontent.com/luanht/remote-tail/master/screenshot.png "Screenshot")

### Libraries
* [node-tail](https://github.com/lucagrulla/node-tail)
* [ruby-tail](https://github.com/flori/file-tail)