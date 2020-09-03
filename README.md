# unreal demo for puerts

## 怎么跑这demo？

* git clone https://github.com/chexiongsheng/puerts_unreal_demo.git 

* 双击puerts_unreal_demo.uproject后，跟着直接点运行即可

* 如果是手机平台运行，要到“项目设置/打包/Additional Not-Asset Directories to Package”，把Content下的“JavaScript”目录添加进去。

## Demo说明

* [本demo目录](.)是一个Typescript工程，可以用vscode（建议安装vscode，nodejs，typescript）打开这个目录。

* [TsGameInstance.cpp](Source/puerts_unreal_demo/TsGameInstance.cpp)是程序逻辑的入口，里头关键语句是JsEnv->Start("QuickStart")，其执行了启动脚本QuickStart.js。

* QuickStart.js是由[TsProj](TsProj)下QuickStart.ts的编译结果，所以直接看QuickStart.ts即可，里头演示主要功能的用法。

* 编译，在vscode上“Terminal -> Run Build Task”选tsc watch，修改代码后会自动编译。