<template>
  <div id="toolbar">
    <div id="heatmap">
      <label>
        <input type="checkbox" style="display:none" v-model="ischecked1" />
        ds
      </label>
      <div v-show="ischecked1">
        <ul>
          <li>
            <input type="range" v-model="range" max="300" />
            {{range}}
          </li>
          <li @click="cirm()">确认</li>
        </ul>
      </div>
    </div>
    <div id="onoff" @click="onoff()">
      <label :style="{backgroundImage:image}"></label>
    </div>
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
      image: start
    };
  },
  methods: {
    cirm() {
      console.log(this.$store.rangeCount);
      this.$store.rangeCount = this.range;
    },
    onoff() {
      let flag = this.image == start;
      ipcRenderer.send("getdata", flag);
      this.image = flag ? pause : start;
    }
  },
  mounted() {
    ipcRenderer.on("over", event => {
      this.image = start;
      event.sender.send("getdata", false);
    });
  }
};
</script>

<style>
#toolbar {
  display: flex;
  height: 100%;
}
#toolbar > div {
  user-select: none;
  -webkit-app-region: no-drag;
  width: 2em;
  height: 100%;
}
#toolbar > div:hover {
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
#heatmap > div > ul {
  background-color: rgb(219, 206, 206);
  position: absolute;
  top: 0;
  z-index: 20;
}
#onoff > label {
  display: block;
  width: 100%;
  height: 100%;
  background-position: center;
  background-size: 60% 60%;
  background-repeat: no-repeat;
}
</style>