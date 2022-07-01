# @jsdkit/bridge

[即时设计](https://js.design/) 开发辅助工具，方便宿主与 iframe 通信。

同时本项目，也可做为使用 React 进行即时设计插件开发的基础模板。

## 安装

### ES6(推荐)

```shell
npm i @jsdkit/bridge
```

### UMD(不推荐)

npm 包中包含 umd 文件，你可以下载下来后，添加到工程中：

```html

<script src="./node_modules/@jsdkit/bridge/dist/index.umd.js"></script>
```

## 使用

### ui 调用 host

首先在 host 中提供一个 createRectangle 方法：

```typescript
import {createUiBridge} from '@/lib';

const ui = createUiBridge();

// 定义一个方法，供 ui 环境使用
ui.createRectangle = async (count) => {
    console.log('ui 传递的参数：', count);  // 123
    // 使用 return 将值直接传递给 ui
    return true;
};

jsDesign.showUI(__html__);
```

在 ui 环境中，直接调用宿主中的 createRectangle 方法：

```typescript
import {createHostBridge} from '@jsdkit/bridge';

const host = createHostBridge('你的插件id');
const res = await host.createRectangle(123);
console.log(res)  // res 即为 host 中 createRectangle 方法的返回值 (true)
```

### host 调用 ui

首先在 ui 中提供一个 changeButtonColor 方法：

```typescript
import {createHostBridge} from '@jsdkit/bridge';

const host = createHostBridge('你的插件id');

// 定义一个方法供 host 调用
host.changeButtonColor = (color: string) => {
    // 收到 color 参数
    document.getElementById('btn').style.backgroundColor = color;
};
```

在 host 环境中，直接调用 ui 中的 changeButtonColor 方法：

```typescript
// 调用 ui 方法
import {createUiBridge} from '@/lib';

const ui = createUiBridge();
ui.changeButtonColor('#f00'); // 如果有返回值，也可以使用 await 来接收
jsDesign.showUI(__html__);
```

## TypeScript 支持

您只需要对提供的方法进行声明，并在 createBridge 时传入泛型声明即可：

示例：

```typescript
// interfaces.ts ，此文件仅为 ts 定义文件，会被 host 和 ui 环境共用类型提示
export interface Bridge {
    /** 创建矩形 */
    createRectangle(count: number): Promise<boolean>;

    /** 改变按钮颜色 */
    changeButtonColor(color: string): void;
}
```

在 ui 中使用:

```typescript
const host = createHostBridge<Bridge>('你的插件id');
```

之后输入 `host.`，您的编辑器即可自动提示。

在 host 中使用：

```typescript
const ui = createUiBridge<Bridge>();
```

之后输入 `ui.`，您的编辑器即可自动提示。
