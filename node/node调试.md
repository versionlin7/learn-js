# 调试

1.

```
    node --inspect-brk xxx.js [arg]
    暂停在第一行,一般使用第一种
```
---


![1568205730443](D:\CODE\js\node\Untitled.assets\1568205730443.png)

![1568208069491](D:\CODE\js\node\Untitled.assets\1568208069491.png)

然后打开浏览器调试

![1568208265435](D:\CODE\js\node\Untitled.assets\1568208265435.png)

----

2. VS Code 调试

3. ndb调试  

   ```node
   npm i -g ndb
   ndb node --inspect xxx.js [arg]
   ndb node --inspect-brk xxx.js [arg]
   ```

   

   ![1568209561161](D:\CODE\js\node\Untitled.assets\1568209561161.png)

![1568209820381](D:\CODE\js\node\Untitled.assets\1568209820381.png)

---

----

![1568291657216](D:\CODE\js\node\node调试.assets\1568291657216.png)

![1568291698563](D:\CODE\js\node\node调试.assets\1568291698563.png)

![1568291727767](D:\CODE\js\node\node调试.assets\1568291727767.png)

![1568642028710](D:\CODE\js\node\node调试.assets\1568642028710.png)

#!/usr/bin/env node   linux下js文件头