let path = require('path')
win32 //windows
posix //linux
path.basename('/foo/bar.jpg')//bar.jpg
path.basename('/foo/bar.jpg', '.jpg')//bar
path.delimiter //win; linux :
path.dirname('/foo/bazzz/bar.jpg', '.jpg')//'/foo/bazzz'
path.extname('/foo/bar/baz.png')//'.png
path.parse('/foo/bar/baz.png')
//{root: '/',
// dir: '/foo/bar',
// base: 'baz.png',
// ext: '.png', 
// name:'baz'}
path.isAbsolute('foo/bar')//false
path.isAbsolute('/foo/bar')//true
path.isAbsolute('c:/foo/bar')//true
path.join('foo/bar', 'baz/', '/baa/')//'foo/bar/baz/baa/'
Path.resolve('/foo/bar/baz', '../1')// 'c:/foo/bar/1' 相当于在当前路径cd'../1'
Path.resolve('/foo/bar/baz', '/../1')// 'c:/1'
path.relative('/foo/bar/baz/baa/', '/foo/bar/1/2')//'../../1/2'
path.sep//win'\\' linux'/'
path.normalize('foo/bar/baz/../../')//'foo\\'