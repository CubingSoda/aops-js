import url from "url";

class Methods {
  async action(data, requirements) {
    const requiredKeys = Object.keys(requirements);
    const dataKeys = Object.keys(data);

    // check for invalid parameters
    dataKeys.forEach((key) => {
      if (!requiredKeys.includes(key)) {
        console.log(
          "AoPS-JS: Invalid parameter(s). See README.md for more info."
        );
        return;
      }
    });

    // make sure required values exist
    dataKeys.forEach((key) => {
      // bool
      if (typeof requiredKeys[key] === true && !(key in data)) {
        console.log(
          "AoPS-JS: Invalid parameter(s). See README.md for more info."
        );
        return;
      }
    });

    // make the string
    let string = "";
    dataKeys.forEach((key) => {
      string += `${key}=${data[key]}&`;
    });

    if (requiredKeys.includes("aops_logged_in")) {
      string += `aops_logged_in=true&aops_user_id=${this.uid}&aops_session_id=${this.sessionID}&`;
    }
    if (requiredKeys.includes("a")) {
      string += `a=${requirements["a"]}`;
    }

    const sendPostParams = new url.URLSearchParams(string);
    const action = await this.instance.post(
      this.CMTY_AJAX,
      sendPostParams.toString(),
      {
        headers: {
          "content-type": "application/x-www-form-urlencoded",
          cookie: `aopsuid=${this.uid};  aopssid=${this.cookieID}`,
        },
      }
    );

    this.print(action.data);
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
      is_announcement: false,
    });
  }
}

export default Methods;
