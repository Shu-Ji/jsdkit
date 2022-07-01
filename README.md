# 即时设计插件开发工具套件

[即时设计](https://js.design/) 开发辅助工具，方便宿主与 iframe 通信。

同时本项目，也可做为使用 React 进行即时设计插件开发的基础模板。

## 概念

**host：** 运行于即时宿主页面的程序。（如官方示例中的code.js）

**ui：** 运行于 iframe 沙箱内的程序。(如官方示例中的index.html)

即时设计官方提供了二者的[通信机制](https://js.design/developer-doc/Guide/2.Development/2.GUI)。

本项目为了解决 postMessage 异步通信的麻烦而创建。

使您可以像调用本地同步函数一样，进行二者(宿主与iframe)间双向通信。

[阅读 2 分钟教程](./packages/bridge/README.md)
