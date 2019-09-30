# require路径

/foo/bar/node_moduels/xx/package.json或者/foo/bar/node_moduels/xx/index.js

package.json:

{

​	"main": "foo.js"

}

若找不到则到上级目录

/foo/node_moduels/xx/package.json或者/foo/node_moduels/xx/index.js

![1568212234660](D:\CODE\js\node\Modules.assets\1568212234660.png)



> fd File Descriptor 文件描述符
>
> fs.FSWatcher 文件监控
>
> fs.open(path[,flags[,mode]], callback) return fd
>
> > fs.read(fd, buffer, offset, length, position,callback)
> >
> > fs.write(fd, buffer[,offset[,length[,position]]], callback)

> fs.readdir(xxx, {withFileTypes: true}) or fs.readirSync(xxx, with:FileTypes: true) 
>
> return Dirent

<img src="D:\CODE\js\node\Modules.assets\1568378910748.png" alt="1568378910748"  />

>

浏览器格式化工具Intl

Internationalization support ~~i18n





worker模块

![1569831206507](D:\CODE\js\node\Modules.assets\1569831206507.png)

![1569831278883](D:\CODE\js\node\Modules.assets\1569831278883.png)

![1569831316312](D:\CODE\js\node\Modules.assets\1569831316312.png)