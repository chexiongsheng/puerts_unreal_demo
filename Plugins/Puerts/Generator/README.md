## TGameJS生成代码工具使用说明

-----

### 环境要求

- Windows
- Python 2.7 (32 bit)

### 快速使用

```shell
cd Generator
python main.py
```

执行该命令后，会生成两部分内容：1.C++ wrap代码（`Plugins\TGameJS\Source\TGameJSCore\Private\Gen`）；2.TS声明（`Content\Typing\ue\ue_s.d.ts`）

### 测试

在`Source\TGameJsUnrealDemo\TsGameInstance.cpp`文件的函数`UTsGameInstance::Init()`中，修改`GameScript->Start`的第一个参数为`"RunAutoGenTest"`，然后运行demo程序即可。在log面板可以看到测试结果。

测试用例位于`Content\JavaScript\AutoGenTest.js`。

### 配置

- 输入

在`Generator\main.py`文件中，通过往`OptionParser`添加选项来配置生成的代码所需的输入信息：
1. 待生成类型的C++头文件
2. 工程文件
3. 输出目录

- 指定生成类型

在`Generator\main.py`文件中，全局变量`ue_type`和`custome_type`用来配置待生成的类型。

- 设置黑名单

在`Generator\main.py`文件中，可以设置TS声明的黑名单，避免生成某些类型的TS声明。

还可以设置避免生成某些类型的某些构造函数、成员函数。格式如下：
```python
function_blacklist = {
    "FooType" : [
        {
            "function_name" : "BarMethod",
            "argument_type" : ["const FString &"]
        },
    ],
}


```