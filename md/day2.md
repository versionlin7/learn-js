* 回顾数学知识
  * 集合 Set
    * 交并差
    * {1,2,3,4} {2,4,5}
  * 数列
    * 通项 a(n) = n * n + 2 * n + 5
    * 前N项和 S(n)
    * 等差 1 2 3 4 5 6 7 
    * 等比
    1 2 4 8 16 32 64 128 256 512 1024 2048 4096 8192 16384 32768 65536
  * 函数 function f(x) = x * x
    * f(x)    f(4) -> 16
    * g(x)
    * h(x)
    * sin(x)
    * cos(x)
    * f(x,y) = x * x + 2 * y
      * f(3,4)
    * f(a,b,c,d) = a + b * b + 2 * c + d / 5
    * f(3,2,4,5)
  * 映射
    * 从一个域的值映射到另一个域的值 。
    * 1 => a
    * 2 => a
    * 3 => b
    * 4 => c
  * 导数，导函数
    * 函数表达映射关系
    * 函数的值表达的一般来说是一个数
    * 函数（映射）
    * 函数在某点的值（x的值通过映射关系得到的另一个值f(x)）
    * 函数在某点的导数（函数图像在这一点的斜率）
    * 函数的导函数（函数在每个点及每个点的斜率所形成的关系）

  * 二进制（整数，小数）
  * 线性/非线性
  * 多项式/非多项式
  * 三角函数及图像
  * 坐标系（笛卡尔，极坐标）
  * 指数 2 ** 3   2 ^ 3
  * 对数








* 通识介绍
  * 软件是什么
  * 操作系统
      * Windows/OS X(unix)/Linux(Linus)
        * git
      * 软件与硬件中间的桥梁
        * 管理硬件
          * 对软件隐藏硬件的细节
        * 为软件提供接口以使用硬件
  * 浏览器
      * 自主内核浏览器
      * IE -> EDGE / Chrome / Firefox / Safari / Opera
        * Safari -> webkit
        * Chrome webkit 
          * FORK
        * 15年，Opera转用webkit内核
          * 保持浏览器内核多样性有什么好处？
        * Blink
        * gecko
        * trigent
        * 内核： 安卓系统的内核是Linux
        * 6 weeks
        * cutting edge/bleeding edge 尖端技术
        * shipped with bleeding edge tech
      * 壳浏览器(IE+Chrome)
        * 360
        * 遨游
        * 猎豹
        * 五星浏览器
      * 移动端（手机，平板）（区别于桌面）
        * 壳浏览器
          * 体积较小的浏览器
        * 系统自带浏览器（5.0+，跟Chrome同步）
          * 国内绝大多数安卓系统4.4+
          * Android系统webview
        * 微信浏览器
          * 安卓：webkit修改版（x5）
          * iOS：iOS系统自带浏览器内核，即webkit
            * iOS 系统 App 是不能自带浏览器内核的
          * Windows Phone：忽略
  * 兼容性
      * 不只浏览器这块存在兼容性
        * 早些年的时候，兼容性主要出现在CSS这块
        * 目前的招聘已经把重点从兼容性转向了对新技术的了解
        * 软件也有
        * 操作系统也有







  * 图形化操作系统
  * 命令行界面操作系统








  <!-- * windows 3.2
  * QQ远程协助引入
  * 远程GUI
  * 然后到远程CLI
  * 以telnet演示
  * 之后引入ssh，vps -->





* WHY 二进制
  * 数字信号
  * 误差
  * 模拟信号：把设备里读出来的物理量直接使用
    * 衰减比较小，适合远距离传输
  * 数字信号：如果把模拟信号理解01，就称为数字信号。
    * 衰减严重，适合近距离传输
  * 光猫（光纤 调制 解调 器）

* 为什么计算机要使用二进制？
  * 二进制足够简单
  * 二进制足够使用
  * 布尔代数为基础 命题逻辑
  * 计算机这么**复杂**的东西，二进制真的够吗？
    * 有与无，阴与阳，是与非，真与假，0与1
  * 编码




* 图片格式
  * jpg jpeg
    * 有损压缩，压缩率很高，一般能够压缩到原始数据量的十分之一
    * 质量越差，体积越小
    * 现实社会的照片
  * png portable network graphic
    * 无损压缩
    * 适合存储大片完全相同颜色的图片，典型的就是软件的截图
    * 不适合用来保存照片
    * 支持透明色（Alpha通道）
      * 每个点实际上由4个字节组成
      * Red Green Blue Alpha
      * 256*256*256=1677w
      * 65536色屏幕
      * Surface Pen，压感触笔，1024级
  * gif
    * 动图
    * 颜色表
    * 无损压缩(原始图片颜色数量不足256时)
    * 会有压缩过程存在
    * gif图片一般长宽都比较小
      * 意味着它里的颜色数量比较小
    * 抽样出256种颜色
    * 并没有存储每张图的所有点
      * 而只存储了变化了的那些点
      * 第一帧肯定存储完整的
    * 支持透明，但支持两种透明，要么某个点完全透明，要么完全不透明
  * bmp
    * 无压缩，无损
    * 每个点占三个字节（取决于具体保存的格式：1670w色/24位，单色/1bit，256色/8bit，65536色/16bit）
    * 体积巨大
    * 不适合放在网页里
  * psd
    * Photoshop
    * 保存了Photoshop在构造这张图片的过程中的所有信息
      * 图层
      * 名字
      * 选区
    * 浏览器是不认识这种格式的。
      * ACD See
  * webp
    * Google发明
    * 有损压缩
    * 各方面都胜过jpg
    * 适合在移动端使用
    * 支持alpha通道

  * 1670万色
  * 65536色



* 命令行
    * GUI VS CLI
      * GUI - Graphics User Interface，图形化**用户**界面/接口
      * CLI - Command Line Interface，命令行界面
    * //VPS 云主机 Virtual Private Server
    * GUI程序与CLI程序唯一的区别就在于形式不一样
    * API
      * Application Programming Interface 应用编程接口
        * jQuery
        * jQuery.get(url)
    * 命令行是程序员【技能树】的树根
      * 精一门，通多门
      * 单会一种是没法干活的
      * 需要围绕着你精通的技能展开技能树
    * 不同系统命令行的区别
      * Linux
      * cgywin
      * mingw
      * wsl Windows Subsystem for Linux
      * 虚拟机
    * 命令行最重要的两个概念
      * 当前工作目录(working folder/directory/tree)
        * current directory
      * 路径（列表）
    * 命令行基础
        * prompt 命令 提示符
        * 工作目录，Current Directory
          * pwd可以显示当前工作目录
        * 命令的格式
          * 命令名 参数1 参数2 参数3 参数4 ...
          * 参数是可选的
          * 
        * 一般命令，裸命令
            * pwd, cls/clear, ls,cd
            * print working diretory

        * 带选项/参数的命令
            * ls --long-output
            * ls -l
            * ls --help
            * ls -h
            * <input>
            * <input type="password" required>

        * 选项的简写与完整写法
          * command -a
          * command --append
          * command -abc <==> comamnd -a -b -c
          * 例： tar -xv    -fc ./foo.tar
        * 选项带值的命令
            * chrome.exe --proxy-pac-url "xxx"
            * chrome.exe --proxy-pac-url=https://xrlovefruits.com:5050/pac.js
            * babel a.js -o=a.compiled.js
            * babel src/a.js --output=dist/a.compiled.js
        * 将命令的输出到文件
            * echo abc > foo.txt
        * 将命令的追加到文件
            * echo def >> foo.txt
        * pipe 前一个命令的输出(Output)做为后一个命令的输入(Input)
            * 管道符
            * IO  xxx.io  Google I/O 大会
            * input output
            * pm2 | grep "to" | lolcat    vertical bar
        * 命令行里按tab
          * 自动补全
        * ctrl+C

* 常用命令
    * ls     list 
    * cat,   con cate nate
    * echo
    * cd   change directory
      * cd 相对路径（相对于当前工作目录）
      * cd 绝对路径
      * 补充：
        * 路径
        * 相对路径

        /etc

        * 绝对路径
        * win/linux区别
    * sudo super user do
      * sudo mkdir dir
      * gitlab删库事件
    * vi
        * 基础使用
        * 达到可以在vps上编辑文本文件即可
            * esc 从编辑模式返回常规模式
            * i 常规模式下进入编辑模式
            * :wq 常规模式下输入
            * jkhl
        * 小白替代工具 mcedit 全鼠标操作
    * mkdir 创建文件夹（目录）thedir // make directory/folder/path
    * rmdir 删除文件夹 只能删除空的 remove directory
    * rm 删除文件
    * rm -r thedir 删除thedir及其内容 
    * cp a.txt b.txt 复制
    * mv old new 移动（重命令）
    * touch a.txt 创建（空）文件
    * //chmod 文件权限控制
    * time command
        * 计算某命令的运行时间
    * date
        * 显示时间和日期
    * cal
        * 显示日历
    * //scp
    * //ping ip 测试与目标ip的连通性


* 最最基础的**编码**知识
  * ASCII 与 Unicode
  * American Stanand Code for Infomation Interchange

* ASCII表
  * GB2312 GBK
* Unicode
  * 我 25105
