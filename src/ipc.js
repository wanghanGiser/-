const {
  ipcMain,
  app
} = require('electron')

const fs = require("fs");
const path = require("path");
const od = 24 * 60 * 60 * 1000;
let interval;
ipcMain.on('first', (event) => {
  let fn = '2020-02-13';
  let filepath = path.join(__static, "/data/" + fn + ".json");
  event.sender.send("data", fs.readFileSync(filepath, {
    encoding: 'UTF-8'
  }), fn);
})
ipcMain.on("getdata", (event, flag) => {
  if (interval) clearInterval(interval);
  let start = (new Date("2020-02-13")).getTime();
  let end = new Date((new Date()).toISOString().substr(0, 10)).getTime();
  if (!flag) {
    let fn = (new Date(start)).toISOString().substr(0, 10);
    let filepath = path.join(__static, "/data/" + fn + ".json");
    if (fs.existsSync(filepath)) {
      event.sender.send("data", fs.readFileSync(filepath, {
        encoding: 'UTF-8'
      }), fn);
    }
    return;
  }
  start += od
  interval = setInterval(() => {
    if (start <= end) {
      let fn = (new Date(start)).toISOString().substr(0, 10);
      let filepath = path.join(__static, "/data/" + fn + ".json");
      if (fs.existsSync(filepath)) {
        event.sender.send("data", fs.readFileSync(filepath, {
          encoding: 'UTF-8'
        }), fn);
      } else {
        filepath = path.join(global.__static, "/data/" + fn + ".json");
        if (fs.existsSync(filepath)) {
          event.sender.send("data", fs.readFileSync(filepath, {
            encoding: 'UTF-8'
          }), fn);
        }
      }
      start += od
    } else {
      event.sender.send("over")
      clearInterval(interval);
    }
  }, 1000)
})
ipcMain.on("close", () => {
  app.quit();
})
let current = (new Date("2020-02-13")).getTime();
const start = (new Date("2020-02-13")).getTime();
const end = (new Date(((new Date()).toISOString().substr(0, 10)))).getTime();
ipcMain.on('change', (event, flag) => {
  if (interval) clearInterval(interval);

  if (flag) {
    if (current >= end) {
      return;
    }
    current += od;
  } else {
    if (current <= start) {

      return;
    }
    current -= od;
  }
  let fn = (new Date(current)).toISOString().substr(0, 10);
  let filepath = path.join(__static, "/data/" + fn + ".json");
  if (fs.existsSync(filepath)) {
    event.sender.send("data", fs.readFileSync(filepath, {
      encoding: 'UTF-8'
    }), fn);
  } else {
    filepath = path.join(global.__static, "/data/" + fn + ".json");
    if (fs.existsSync(filepath)) {
      event.sender.send("data", fs.readFileSync(filepath, {
        encoding: 'UTF-8'
      }), fn);
    }
  }
})
module.exports = interval