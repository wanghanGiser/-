const fs = require('fs');

// let start = (new Date("2020-02-12")).getTime();
// let now = new Date((new Date()).toISOString().substr(0, 10)).getTime();
// const od = 24 * 60 * 60 * 1000;

// while (start <= now) {
//   let file = (new Date(start)).toISOString().substr(0, 10);
//   add(file);
//   start += od;
// }

module.exports= function add(filename) {
  let jsonstr = filename;
  const reg = /.+(省|自治区)/
  jsonstr.forEach(i => {
    if (reg.test(i.provinceName)) {
      i.cities.forEach(j => {
        if ((j.cityName != "未明确地区")&&(j.cityName!="监狱系统")) {
          let location = JSON.parse(fs.readFileSync(__static + "/city/" + j.cityName + ".txt")).location;
          j.location = location;
        }
      })
    } else {
      let location = JSON.parse(fs.readFileSync(__static + "/city/" + i.provinceName + ".txt")).location;
      i.location = location;
    }
  });
  return jsonstr
}