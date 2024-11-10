# Usage

## es module

```js
import { timeId } from "aardpro-time-id";

const id = timeId();
```

## commonjs

```js
const { timeId } = require("aardpro-time-id");

const id = timeId();
```

## type

```ts
function timeId(
  suffixLength?: number,
  accumulator?: (timestamp: number) => number
): string;
```

### suffixLength, the length of the suffix.

> If it is 0 or negative, no suffix is added.  
> The default is 3.

### accumulator, a method to generate an increment number,

> Parameter is the timestamp when the id is generated.
> Return a unique number such as 1, 2, 3... to be used as a suffix.  
> if the returned number digits are more than suffixLength, the suffixLength will be ignored.
> For distributed deployment, you can use Redis or other methods to produce cross-node increment numbers, use async accumulator and timeIdAsync.

# Ver 1.1.0 update

## timeIdAsync, use async accumulator

```ts
import { timeIdAsync } from "aardpro-time-id";

// example, accumulatorAsync return unique sequence number from your redis based on timestamp
const accumulatorAsync = (timestamp: number): Promise<number> =>
  Promise.resolve(timestamp + 1);

const id = await timeIdAsync(3, accumulatorAsync);
```
