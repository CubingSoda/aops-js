# AoPS JS

An unofficial API for the Art of Problem Solving Website.

## Usage

Make sure to wrap the code around an `async` function and prefix the methods with `await`.

```js
import { AoPS } from "aops-js";

(async () => {
  const aops = await new AoPS({ verbose: true });
})();
```

## Login

```js
aops.login({ username: "x", password: "x" });
```

Required:

```
username
password
```

## Submit Post

```js
aops.submitPost({ post_text: "Hello World!", topic_id: "3156623" });
```

Required:

```
post_text
topic_id
```

Optional:

```
notify_email
allow_latex_errors
last_post_num
disable_bbcode
is_announcement
```

## Submit New Topic

```js
await aops.submitNewTopic({
  post_text: "Hello World!",
  title: "Hello World!",
  category_id: "1"
});
```

Required:

```
category_id
title
post_text
```

Optional:

```
tags
linked_tag
target_url
target_text
source
post_as_halp
pm_as_sheriff
allow_latex_errors
hidden_tags
restricted_tags
removed_autotags
notify_email
attachments
has_poll
poll_data
recipients
disable_bbcode
is_local_announcement
is_global_announcement
announce_through
```

## Get User Avatar (URL)

```js
await aops.getUserAvatar({ aops_user_id: "1" });
```

Required:

```
aops_user_id
```
