import axios from "axios";
import Methods from "./methods.js";

export default class AoPS extends Methods {
  constructor(data) {
    super();

    // constants
    this.AJAX = "/ajax.php";
    this.CMTY_AJAX = "/m/community/ajax.php";

    // verbose option
    this.print = data.verbose ? (text) => console.log(text) : (text) => {};

    // setup axios
    this.instance = axios.create({
      baseURL: "https://artofproblemsolving.com"
    });
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
