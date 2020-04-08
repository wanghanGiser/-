const axios = require("axios");
const fs = require("fs");
const add = require('./addlocation.js')

module.exports = function getData() {
  let start = (new Date("2020-02-13")).getTime();
  let now = new Date((new Date()).toISOString().substr(0, 10)).getTime();
  const od = 24 * 60 * 60 * 1000;
  let url = "http://api.tianapi.com/txapi/ncovcity/index?key=552b7513cfa8f92580a56a467008847c&date="
  let path = __static + "/data/";
  if (!fs.existsSync(path)) {
    fs.mkdirSync(path);
  }
  let reqs = [];
  while (start <= now) {
    if (!fs.existsSync(path + (new Date(start)).toISOString().substr(0, 10) + ".json")) {
      reqs.push({
        handle: axios.get(url + (new Date(start)).toISOString().substr(0, 10)),
        path: path + (new Date(start)).toISOString().substr(0, 10) + ".json"
      })
    }
    start += od;
  }
  for (let i = 0; i < reqs.length; i++) {
    reqs[i].handle.then(res => {
      if (res.data.code == 200) {
        fs.writeFileSync(reqs[i].path, JSON.stringify(add(res.data.newslist)));
      }
    })
  }
}