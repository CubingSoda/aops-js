# AoPS JS

An unofficial API for the Art of Problem Solving Website.

## Installation

```shell
npm install aops-js
```

```shell
yarn add aops-js
```

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

<details>

<summary>
Params
</summary>
<br/>

Required:

```
username
password
```

</details>

## Submit Post

```js
aops.submitPost({ post_text: "Hello World!", topic_id: "3156623" });
```

<details>

<summary>
Params
</summary>
<br/>
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

</details>

## Submit New Topic

```js
await aops.submitNewTopic({
  post_text: "Hello World!",
  title: "Hello World!",
  category_id: "1"
});
```

<details>

<summary>
Params
</summary>
<br/>

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

</details>

## Get User Avatar (URL)

```js
await aops.getUserAvatar({ aops_user_id: "1" });
```

<details>

<summary>
Params
</summary>
<br/>
Required:

```
aops_user_id
```

<details>
