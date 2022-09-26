import url from "url";

class Methods {
  async submitPost(
    post_text,
    topic_id,
    notify_email,
    allow_latex_errors,
    last_post_num,
    disable_bbcode,
    is_announcement
  ) {
    const sendPostParams = new url.URLSearchParams(
      `post_text=${post_text}&\
      topic_id=${topic_id}&\
      notify_email=${notify_email}&\
      allow_latex_errors=${allow_latex_errors}&\
      last_post_num=${last_post_num}&\
      disable_bbcode=${disable_bbcode}&\
      is_announcement=${is_announcement}&\
      a=submit_post&\
      aops_logged_in=true&\
      aops_user_id=${this.uid}&\
      aops_session_id=${this.sessionID}`
    );

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
}

export default Methods;
