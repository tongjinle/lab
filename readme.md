# handy-redis

[github](!https://github.com/mmkal/handy-redis)

一个基于 promise 的 redis 库,语言是 typescript

```typescript
import { createHandyClient } from "handy-redis";

async function test() {
  let client = createHandyClient();
  await client.set("name", "sannian");
  let name: string = await client.get("name");
  console.log(name);
  await client.quit();
}

async function multi() {
  let client = createHandyClient();
  const multi = client
    .multi()
    .set("z:foo", "987")
    .keys("z:*")
    .get("z:foo");

  const result = await client.execMulti(multi);
  console.log(result);
  await client.quit();
}

test();
multi();
```
