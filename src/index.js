import axios from "axios";
import url from "url";

import Methods from "./methods.js";

export class AoPS extends Methods {
  constructor(data = {}) {
    super();

    // verbose option
    this.print = data.verbose ? (text) => console.log(text) : () => {};

    // constants
    this.AJAX = "/ajax.php";
    this.CMTY_AJAX = "/m/community/ajax.php";

    // setup axios
    this.instance = axios.create({
      baseURL: "https://artofproblemsolving.com",
    });
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
        cookie: `aopsuid=1; aopssid=${this.cookieID}`,
      },
    });
    this.updateUID(login);
    this.print(login.data);
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
}
