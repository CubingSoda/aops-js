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

## Submit New Topic

```js
await aops.submitNewTopic({
  post_text: "Hello World!",
  title: "Hello World!",
  category_id: "1"
});
```

```js
category_id: true,
title: true,
post_text: true,

tags: false,
linked_tag: false,
target_url: false,
target_text: false,
source: false,
post_as_halp: false,
pm_as_sheriff: false,
allow_latex_errors: false,
hidden_tags: false,
restricted_tags: false,
removed_autotags: false,
notify_email: false,
attachments: false,
has_poll: false,
poll_data: false,
recipients: false,
disable_bbcode: false,
is_local_announcement: false,
is_global_announcement: false,
announce_through: false
```
