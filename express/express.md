express生成器

https://expressjs.com/zh-cn/starter/generator.html

npm i -g express-generator

![1568902268879](D:\CODE\js\express\express.assets\1568902268879.png)

```js
app.listen = function() {
  var server = http.createServer(this);
  return server.listen.apply(server, arguments);
};
```

