const fs = require('fs');
const getCity = require('./getcity')

module.exports = async (filename) => {
  let jsonstr = filename;
  const reg = /.+(省|自治区)/
  for (let x = 0; x < jsonstr.length; x++) {
    let i = jsonstr[x];
    if (reg.test(i.provinceName)) {
      for (let y = 0; y < i.cities.length; y++) {
        let j = i.cities[y];
        if ((j.cityName != "未明确地区") && (j.cityName != "监狱系统")) {
          let city = __static + "/city/" + j.cityName + ".txt";
          if (fs.existsSync(city)) {
            let location = JSON.parse(fs.readFileSync(city)).location;
            j.location = location;
          } else {
            city = global.__static + "/city/" + j.cityName + ".txt";
            if (fs.existsSync(city)) {
              let location = JSON.parse(fs.readFileSync(city)).location;
              j.location = location;
            } else {
              let res = await getCity(j.cityName);
              if (res) {
                let location = JSON.parse(fs.readFileSync(city)).location;
                j.location = location;
              }
            }

          }
        }
      }
    } else {
      let city = __static + "/city/" + i.provinceName + ".txt";
      if (fs.existsSync(city)) {
        let location = JSON.parse(fs.readFileSync(city)).location;
        i.location = location;
      } else {
        city = global.__static + "/city/" + i.provinceName + ".txt";
        if (fs.existsSync(city)) {
          let location = JSON.parse(fs.readFileSync(city)).location;
          i.location = location;
        } else {
          let res = await getCity(i.provinceName);
          if (res) {

            let location = JSON.parse(fs.readFileSync(city)).location;
            i.location = location;
          }
        }
      }
    }
  }
  return jsonstr
}