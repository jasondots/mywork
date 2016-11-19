
git快速手册

-------------------------------------------------------------------
安装 （略）

-------------------------------------------------------------------
创建git目录

//首先，在硬盘上创建一个目录，进入目录 右键→git Bach Here，弹出命令行窗口

以下，是在命令行窗口内操作：


$ mkdir mywork   // mywork为目录名，可以随便取

$ cd runoob     //进入目录

$ git init    // 初始化git，git会在当前目录，创建一个隐藏目录" .git",这个目录记录这所以git相关信息，不能删除！

//屏幕显示内容： Initialized empty Git repository in E:/git_work/mywork/.git/


----------------------------------------------------------------------
克隆仓库 clone

git可以自己在本地的电脑上进行版本管理，不依靠服务器

git的重要功能就是协同开发，共同进行项目的版本控制，就需要安装git服务器

github是互联网上一个著名的git服务器，可以将自己的代码，放在github上进行托管

在github上注册用户，就可以开辟出属于自己的一个git仓库，进行版本控制



$ git clone git://github.com/jQuery/jquery.git       //git://github.com/jQuery/jquery.git 为github上的仓库

----------------------------------------------------------------------------
远程仓库相关命令 remote 

查看远程仓库：$ git remote -v

添加远程仓库：$ git remote add [name] [url]

删除远程仓库：$ git remote rm [name]

修改远程仓库：$ git remote set-url --push [name] [newUrl]


----------------------------------------------------------------------
查看本地文件变化  status

$ git status //查看当前状态，可以显示有哪些文件、目录有过改动


----------------------------------------------------------------------
添加到缓冲区 add

git在正式进行版本更新前，提供一个缓冲区，可以将变更的文件，先保存在缓冲区

在没有正式提交之前，缓冲区的文件可以多次变更，或者清除缓冲区内容（放弃更新）


$ git add 文件名.后缀名      //可以add单独文件，也可以" . "或者 "\*" ,将所有文件的变更全部添加到缓冲区


---------------------------------------------------------------------

提交变更 commit

Git 为你的每一个提交都记录你的名字与电子邮箱地址，所以第一步需要配置用户名和邮箱地址。

$ git config --global user.name 'zhangsan'

$ git config --global user.email zhangsan@abc.com


$ git commit -m "注释语句"    //注释语句是必须填写的 

-------------------------------------------------------------------
推送到远程仓库 push

$ git push origin master     //origin：本地当前线程   master:远程仓库的线程  master为默认的主线程


会提示输入用户名、密码


*如果想把本地的某个分支test提交到远程仓库，并作为远程仓库的master分支，或者作为另外一个名叫test的分支，如下：
$git push origin test:master         // 提交本地test分支作为远程的master分支
$git push origin test:test              // 提交本地test分支作为远程的test分支

------------------------------------------------------------------
拉取远端仓库 pull

$ git pull [remoteName] [localBranchName]


------------------------------------------------------------------
分支 branch


$ git branch               查看本地所有分支

$ git branch -a            查看所有的分支

$ git branch -r            查看远程分支

$ git branch [name]        创建本地分支，注意新分支创建后不会自动切换为当前分支

$ git checkout [name]      切换分支
 
$ git checkout -b [name]   创建新分支并立即切换到新分支

$ git branch -d [name]     删除分支：-d选项只能删除已经参与了合并的分支，对于未有合并的分支是无法删除的。如果想强制删除一个分支，可以使用-D选项

$ git merge [name]         合并分支：将名称为[name]的分支与当前分支合并，注意：要从master合并下层分支

$ git push origin [name]   创建远程分支(本地分支push到远程)

$ git push origin :heads/[name]   删除远程分支

$ git push origin :[name]   删除远程分支（同上） 


创建空的分支：(执行命令之前记得先提交你当前分支的修改，否则会被强制删干净没得后悔)

$git symbolic-ref HEAD refs/heads/[name]
$rm .git/index
$git clean -fdx


-------------------------------------------------------------------------------------
忽略一些文件、文件夹不提交

在仓库根目录下创建名称为“.gitignore”的文件，写入不需要的文件夹名或文件，每个元素占一行即可，如：
target
bin
*.db


work01分支测试


第二次测试

 

 
