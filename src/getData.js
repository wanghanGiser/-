const axios = require("axios");
const fs = require("fs");
const add = require('./addlocation.js')

module.exports = function getData() {
  let start = (new Date("2020-02-13")).getTime();
  let now = new Date((new Date()).toISOString().substr(0, 10)).getTime();
  const od = 24 * 60 * 60 * 1000;
  let url = "http://api.tianapi.com/txapi/ncovcity/index?key=552b7513cfa8f92580a56a467008847c&date="
  let path = __static + "/data/";
  let output=global.__static+"/data/";
  if(!fs.existsSync(output)){
    fs.mkdirSync(output)
  }
  let reqs = [];
  while (start <= now) {
    let filename=(new Date(start)).toISOString().substr(0, 10) + ".json";
    if ((!fs.existsSync(path + filename))&&(!fs.existsSync(output+filename))) {
      reqs.push({
        handle: axios.get(url + (new Date(start)).toISOString().substr(0, 10)),
        path: output + (new Date(start)).toISOString().substr(0, 10) + ".json"
      })
    }
    start += od;
  }
  console.log(reqs.length);
  
  for (let i = 0; i < reqs.length; i++) {
    reqs[i].handle.then(res => {
      if (res.data.code == 200) {
        add(res.data.newslist).then(res=>{
          fs.writeFileSync(reqs[i].path, JSON.stringify(res));
        })
      }
    })
  }
}