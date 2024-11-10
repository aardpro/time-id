# 使用

## es module

```js
import timeId from "aardpro-time-id";

const id = timeId();
```

## commonjs

```js
const timeId = require("aardpro-time-id");

const id = timeId();
```

## type

```ts
function timeId(
  suffixLength?: number,
  accumulator?: (timestamp: number) => number
): string;
```

### suffixLength 后缀的长度

> 如果值为 0 或负数,则不添加后缀  
> 默认为 3    

### accumulator 累加器

> 入参是生产时间id的时间戳
> 返回唯一的数字，如 1,2,3...，用来作为后缀  
> 如果累加器返回的数字位数超过后缀长度，后缀长度会被忽略。
> 如果分布式部署，可以通过 redis 等方式生产跨节点的累加数，使用异步累加器，使用timeIdAsync。

# Ver 1.1.0 更新

## timeIdAsync 使用异步累加器方法

```ts
import { timeIdAsync } from "aardpro-time-id";

const accumulatorAsync = (timestamp: number): Promise<number> =>
  Promise.resolve(timestamp + 1);
const id = await timeIdAsync(3, accumulatorAsync);
```
