const axios = require("axios");
const fs = require('fs');
let url = "http://restapi.amap.com/v3/place/text?types=190500&offset=1&page=1&key=f81508a3f0374f9779b4ec4f666b3f7f&keywords=";
module.exports = async (cityname) => {
  let u=url + cityname;
  let data = (await axios.get(encodeURI(u))).data;  
  if (data.status && data.status == 1) {
    if (data.pois && data.pois[0] && data.pois[0].location) {
      let file = global.__static + "/city/" + cityname + ".txt";
      if(!fs.existsSync(global.__static + "/city/")){
        fs.mkdirSync(global.__static + "/city/");
      }
      let str = {};
      str.cityName = cityname;
      str.locationId = 0;
      str.location = data.pois[0].location;
      fs.writeFileSync(file, JSON.stringify(str));
      return true
    }
    return false
  }
  return false
}