import url from "url";

class Methods {
  async checker(data, requirements) {
    const requirementsKeys = Object.keys(requirements);
    const dataKeys = Object.keys(data);

    // check for invalid parameters
    dataKeys.forEach((key) => {
      if (!requirementsKeys.includes(key)) {
        this.print("Invalid parameter(s). See README.md for more info.", {
          type: "error",
          func: "method data checker"
        });
        return;
      }
    });

    // make sure required values exist
    let passes = [];
    requirementsKeys.forEach((key) => {
      if (requirements[key] === true && !dataKeys.includes(key)) {
        this.print(
          `Missing Parameter: "${key}". See README.md for more info.`,
          {
            type: "error",
            func: "method data checker"
          }
        );
        passes.push(false);
      } else {
        passes.push(true);
      }
    });

    return !passes.includes(false);
  }
  async action(data, requirements) {
    if ((await this.checker(data, requirements)) === false) return;

    const requirementsKeys = Object.keys(requirements);
    const dataKeys = Object.keys(data);

    // make the string
    let string = "";
    dataKeys.forEach((key) => {
      string += `${key}=${data[key]}&`;
    });

    if (requirementsKeys.includes("aops_logged_in")) {
      string += `aops_logged_in=true&\
                aops_user_id=${this.uid}&\
                aops_session_id=${this.sessionID}&`;
    }
    if (requirementsKeys.includes("a")) {
      string += `a=${requirements["a"]}`;
    }

    const sendPostParams = new url.URLSearchParams(string);
    const action = await this.instance.post(
      this.CMTY_AJAX,
      sendPostParams.toString(),
      {
        headers: {
          "content-type": "application/x-www-form-urlencoded",
          cookie: `aopsuid=${this.uid};  aopssid=${this.cookieID}`
        }
      }
    );

    return action.data;
  }

  async submitPost(data) {
    await this.action(data, {
      a: "submit_post",
      aops_logged_in: "true",
      aops_user_id: this.uid,
      aops_session_id: this.sessionID,

      post_text: true,
      topic_id: true,

      notify_email: false,
      allow_latex_errors: false,
      last_post_num: false,
      disable_bbcode: false,
      is_announcement: false
    });
  }

  async submitNewTopic(data) {
    await this.action(data, {
      a: "submit_new_topic",
      aops_logged_in: "true",
      aops_user_id: this.uid,
      aops_session_id: this.sessionID,

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
    });
  }

  async fetchTopics(data) {
    return await this.action(data, {
      a: "fetch_topics",
      aops_logged_in: "true",
      aops_user_id: this.uid,
      aops_session_id: this.sessionID,

      category_id: true,
      category_type: true,

      log_visit: false,
      required_tag: false,
      fetch_before: false,
      user_id: false,
      fetch_archived: false,
      fetch_announcements: false
    });
  }

  async getUserAvatar(data) {
    const requirements = {
      aops_user_id: true
    };

    if (!this.checker(data, requirements)) {
      return;
    }

    const page = `https://avatar.artofproblemsolving.com/avatar_${data.aops_user_id}.png`;
    this.print(page);
    return page;
  }
}

export default Methods;
