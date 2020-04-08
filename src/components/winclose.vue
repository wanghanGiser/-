<template>
  <div id="winclose">
    <div>
      <div id="fold" @click="fold()">─</div>
      <div id="minmax" :style="{backgroundImage:image}" @click="minmax"></div>
      <div id="close" @click="close()">╳</div>
    </div>
  </div>
</template>

<script>
const tomin = "url(" + require("@/assets/tomin.png") + ")";
const tomax = "url(" + require("@/assets/tomax.png") + ")";
const { ipcRenderer } = require("electron");
export default {
  data() {
    return {
      image: tomax
    };
  },
  created() {
    ipcRenderer.on("main-window-max", () => {
      if (this.image != tomin) {
        this.image = tomin;
      }
    });
    ipcRenderer.on("main-window-unmax", () => {
      if (this.image != tomax) {
        this.image = tomax;
      }
    });
  },
  methods: {
    minmax() {
      this.image = this.image == tomax ? tomin : tomax;
      ipcRenderer.send("tomax");
    },
    close() {
      ipcRenderer.send("close");
    },
    fold() {
      ipcRenderer.send("fold");
    }
  }
};
</script>

<style>
#winclose {
  -webkit-app-region: no-drag;
  position: absolute;
  height: 100%;
  width: 7.5em;
  top: 0;
  right: 0;
}
#winclose > div {
  display: flex;
  width: 100%;
  height: 100%;
}
#winclose > div > div {
  flex: 1;
  user-select: none;
  text-align: center;
  cursor: default;
  line-height: 2em;
  color: #ccc;
}

#fold {
}
#fold {
}
#minmax {
  background-size: 30% 40%;
  background-position: center;
  background-repeat: no-repeat;
}
#fold:hover,
#minmax:hover {
  background-color: #747d8c;
}
#close {
}
#close:hover {
  background-color: #ff4757;
}
</style>