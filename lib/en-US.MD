# Usage

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
> The length of the suffix. If it is 0 or negative, no suffix is added.  
> The default is 3.

### accumulator
> A method to generate an increment number, returning a unique number such as 1, 2, 3... to be used as a suffix.  
> The default is based on the local machine timestamp.
> For distributed deployment, you can use Redis or other methods to produce cross-node increment numbers, passing the method that outputs this number as a parameter.
