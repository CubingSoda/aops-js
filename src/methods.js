import url from "url";

class Methods {
  async checker(data, requirements) {
    const requirementsKeys = Object.keys(requirements);
    const dataKeys = Object.keys(data);

    // check for invalid parameters
    dataKeys.forEach((key) => {
      if (!requirementsKeys.includes(key)) {
        console.log(
          "❌ AoPS-JS: Invalid parameter(s). See README.md for more info."
        );
        return;
      }
    });

    // make sure required values exist
    let pass;
    requirementsKeys.forEach((key) => {
      if (requirements[key] === true && !dataKeys.includes(key)) {
        console.log(
          `❌ AoPS-JS: Missing Parameter: "${key}". See README.md for more info.`
        );
        pass = false;
      } else {
        pass = true;
      }
    });

    return pass;
  }
  async action(data, requirements) {
    if (!this.checker(data, requirements)) {
      return;
    }

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

    this.print(action.data);
  }

  async login(userData = {}) {
    this.username = userData.username || undefined;
    this.password = userData.password || undefined;

    // open /, get cookie/session id
    const first = await this.instance.get("/");
    this.updateCookieID(first);
    this.updateSessionID(first);
    this.print(`Cookie ID: ${this.cookieID}\nSession ID: ${this.sessionID}`);

    // login
    const params = new url.URLSearchParams(
      `a=login&username=${this.username}&password=${this.password}&stay=false`
    );

    const login = await this.instance.post(this.AJAX, params.toString(), {
      headers: {
        "content-type": "application/x-www-form-urlencoded",
        cookie: `aopsuid=1; aopssid=${this.cookieID}`
      }
    });
    this.updateUID(login);
    this.print(login.data);
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
