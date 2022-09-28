# AoPS JS

An unofficial API for the Art of Problem Solving Website.

## Usage

```js
import { AoPS } from "aops-js";

(async () => {
  const aops = await new AoPS({ verbose: true });
})();
```

Make sure to wrap the code around an `async` function and prefix the methods with `await`.
For each method, the required parameters are marked as `true`.

## Login

```js
aops.login({ username: "x", password: "x" });
```

```js
username: true,
password: true
```

## Submit Post

```js
aops.submitPost({ post_text: "Hello World!", topic_id: "3156623" });
```

```js
post_text: true,
topic_id: true,

notify_email: false,
allow_latex_errors: false,
last_post_num: false,
disable_bbcode: false,
is_announcement: false
```
