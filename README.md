# unreal demo for puerts

## 怎么跑这demo？

* git clone https://github.com/chexiongsheng/puerts_unreal_demo.git 

* ue4.25及以上版本，需要到这里下载[V8_8.4.371.19_0323](https://github.com/puerts/backend-v8/releases/tag/V8_8.4.371.19_0323)，解压到[Plugins/Puerts/ThirdParty](Plugins/Puerts/ThirdParty)

* 生成vs工程（window下，在mac下生成xcode工程），然后进入工程编译

* 如果要打包运行，要到“项目设置/打包/Additional Not-Asset Directories to Package”，把Content下的“JavaScript”目录添加进去。

* 如果打开基础ue类功能，可能会报找不到react-reconciler的错误，需要到Content/JavaScript下执行`npm install .`安装依赖的库。

## Demo说明

* 本demo目录是一个Typescript工程，可以用vscode（建议安装vscode，nodejs，typescript）打开这个目录。

* [TsGameInstance.cpp](Source/puerts_unreal_demo/TsGameInstance.cpp)是程序逻辑的入口，里头关键语句是JsEnv->Start("QuickStart")，其执行了启动脚本QuickStart.js。

* QuickStart.js是由[TsProj](TsProj)下QuickStart.ts的编译结果，所以直接看QuickStart.ts即可，里头演示主要功能的用法。

* 编译，在vscode上“Terminal -> Run Build Task”选tsc watch，修改代码后会自动编译。

* PerfTest.ts编辑器下在老版本v8以及quickjs后端不可用

* 若采用较新版本的vscode进行调试，发现无法命中断点，则尝试将本demo目录根目录下".vscode"目录中的"launch.json"中的"remoteRoot"配置项的"${workspaceRoot}"修改为"${workspaceFolder}"，或者直接去除"remoteRoot"配置项。