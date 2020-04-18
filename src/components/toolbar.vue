<template>
  <div id="toolbar">
    <div id="heatmap">
      <input id="qwe" type="checkbox" style="display:none" v-model="ischecked1" />
      <label for="qwe">{{confirm}}</label>
      <div v-show="ischecked1">
        <ul>
          <li>
            <input type="range" v-model="range" max="10000" />
            {{range}}
          </li>
          <li @click="cirm()">确认</li>
        </ul>
      </div>
    </div>
    <div id="onoff" @click="onoff()" title="快捷键 空格space">
      <label :style="{backgroundImage:image}"></label>
    </div>
    <div @click="changeDate(1)" title="快捷键 +">➕</div>
    <div @click="changeDate(-1)" title="快捷键 -">➖</div>
  </div>
</template>
<script>
const { ipcRenderer } = require("electron");
const start = "url(" + require("@/assets/start.png") + ")";
const pause = "url(" + require("@/assets/pause.png") + ")";
export default {
  data() {
    return {
      range: 10,
      ischecked1: false,
      image: start,
      confirm: 10
    };
  },
  methods: {
    cirm() {
      this.confirm = this.range;
      this.$store.rangeCount = this.confirm;
    },
    onoff() {
      let flag = this.image == start;
      ipcRenderer.send("getdata", flag);
      this.image = flag ? pause : start;
    },
    changeDate(a) {
      ipcRenderer.send("change", a > 0);
    }
  },
  mounted() {
    ipcRenderer.on("over", event => {
      this.image = start;
      event.sender.send("getdata", false);
    });
    document.body.onkeyup = e => {
      if (e && e.keyCode == 32) {
        this.onoff();
      }
      if (e && e.keyCode == 187) {
        this.changeDate(true);
      }
      if (e && e.keyCode == 189) {
        this.changeDate(false);
      }
    };
  }
};
</script>

<style>
#toolbar {
  display: flex;
  height: 100%;
  color: #f1f2f6;
}
#toolbar > div {
  user-select: none;
  -webkit-app-region: no-drag;
  height: 100%;
  width: 2em;
}
#toolbar > div:nth-of-type(n+2) {
  display: flex;
  justify-content: center;
  align-items: center;
}
#toolbar > div:first-child {
  width: 3.5em;
}
#toolbar > div:nth-child(n + 2):hover {
  background-color: #747d8c;
}
#heatmap > div {
  position: relative;
  height: 0;
}
#heatmap > label {
  display: block;
  width: 100%;
  height: 100%;
  line-height: 2em;
  text-align: center;
}
#qwe + label:hover {
  background-color: #747d8c;
}
#qwe:checked + label {
  background-color: #747d8c;
}
#heatmap > div > ul {
  background-color: #2f3542;
  position: absolute;
  top: 0;
  z-index: 20;
}
#heatmap > div > ul > li {
  text-align: center;
  padding: 5px;
}
#heatmap > div > ul > li:first-child {
  border-bottom: 1px solid #ccc;
}
#heatmap > div > ul > li:last-child:hover {
  background-color: #57606f;
}
#onoff > label {
  display: block;
  width: 100%;
  height: 100%;
  background-position: center;
  background-size: 60% 60%;
  background-repeat: no-repeat;
}
input[type="range"] {
  -webkit-appearance: none;
  outline: none;
  height: 10px;
  border-radius: 5px;
  background-color: #747d8c;
}
input[type="range"]::-webkit-slider-thumb {
  cursor: pointer;
  -webkit-appearance: none;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: azure;
}
</style>