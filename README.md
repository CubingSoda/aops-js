# AoPS JS

An unofficial API for the Art of Problem Solving Website.

## Usage

```js
import { AoPS } from "aops-js";

(async () => {
  const aops = await new AoPS({ verbose: true });
})();
```

## Methods

Make sure to wrap the code around an `async` function and prefix the methods with `await`.

### `aops.login({username: 'x', password: 'x'})`

Logs into AoPS. Takes an object with keys `username` and `password`.

### `aops.submitPost({ post_text: "Hello World!", topic_id: "3156623" })`

Submits a post. User must be logged in. Requires post body and thread ID.
