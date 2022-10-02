import axios from "axios";
import url from "url";

import Methods from "./methods.js";

export default class AoPS extends Methods {
  constructor(data = {}) {
    super();

    // constants
    this.AJAX = "/ajax.php";
    this.CMTY_AJAX = "/m/community/ajax.php";

    this.verbose = data.verbose;
    this.loggedIn = false;

    // setup axios
    this.instance = axios.create({
      baseURL: "https://artofproblemsolving.com"
    });
  }

  print(text, other) {
    if (!this.verbose) return;
    if (!other) {
      console.log(text);
      return;
    }

    // emoji
    let emoji;
    if (other.type === "success") {
      emoji = "✅";
    }
    if (other.type === "warning") {
      emoji = "🟡";
    }
    if (other.type === "error") {
      emoji = "❌";
    }
    if (other.type === "info") {
      emoji = "🛠 ";
    }
    console.log(`${emoji} AoPS-JS (${other.func}): ${text}`);
  }

  updateUID(process) {
    this.uid = process.headers["set-cookie"][0].split(";")[0].slice(8);
  }

  updateSessionID(process) {
    this.sessionID = process.data
      .split("\n")
      .map((e) => {
        if (e.includes("AoPS.session")) {
          return JSON.parse(e.slice(16, -1)).id;
        }
      })
      .filter((undefined) => undefined)[0];
  }

  updateCookieID(process) {
    this.cookieID = process.headers["set-cookie"][1].split(";")[0].slice(8);
  }

  async setIDs() {
    // open /, get cookie/session id
    const first = await this.instance.get("/");
    this.updateCookieID(first);
    this.updateSessionID(first);

    this.uid = "1";

    this.print(`Cookie ID: ${this.cookieID}`, { type: "info", func: "set id" });
    this.print(`Session ID: ${this.sessionID}`, {
      type: "info",
      func: "set id"
    });
  }

  async login(userData = {}) {
    this.username = userData.username || undefined;
    this.password = userData.password || undefined;

    await this.setIDs();

    // credentials not given
    if (!this.username || !this.password) {
      this.print(
        "Username/password not given. Continuing as an anonymous user.",
        {
          type: "warning",
          func: "login"
        }
      );
      return;
    }

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

    // invalid
    if (!login.headers["set-cookie"]) {
      this.print("Invalid Credentials. Continuing as an anonymous user.", {
        type: "error",
        func: "login"
      });
      return false;
    }

    // valid
    if (login.data.response.username === this.username) {
      this.updateUID(login);
      this.loggedIn = true;

      this.print("Successfully Logged in!", { type: "success", func: "login" });
      return login.data;
    }

    // unknown error
    this.print("Something wrong happened. Please submit a GitHub issue.", {
      type: "error",
      func: "login"
    });
  }
}
