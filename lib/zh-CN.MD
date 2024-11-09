# 使用

## es module

```js
 import timeId from 'aardpro-time-id'

 const id = timeId()
```

## commonjs
```js
 const timeId = require('aardpro-time-id')

 const id = timeId()
```

## type

```ts
function timeId(suffixLength?: number, accumulator?: (num: number) => number): string
```

### suffixLength
> 后缀的长度, 如果为0或负数,则不添加后缀    
> 默认为3


### accumulator
> 产生累加数的方法， 返回唯一的数字，如1,2,3...，用来作为后缀    
> 默认根据单机时间戳生成。
> 如果分布式部署，可以通过redis等方式生产跨节点的累加数，把输出这个数字的方法作为参数。   
