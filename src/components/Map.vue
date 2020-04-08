<template>
  <div id="map">
    <div id="date">当前日期:{{date}}</div>
  </div>
</template>

<script>
import { map, getHeatMap, getSource, getFeatures } from "@/js/map.js";
const { ipcRenderer } = require("electron");
export default {
  name: "map1",
  data() {
    return {
      date: "",
      heatmap:undefined
    };
  },
  mounted() {
    map.setTarget("map");
    ipcRenderer.on("data", (event, data, date) => {
      this.date = date;
      if (!this.heatmap) {
        this.heatmap = getHeatMap();
        this.heatmap.setSource(getSource(getFeatures(JSON.parse(data),this.$store.rangeCount)));
        map.addLayer(this.heatmap);
      } else {
        this.heatmap.getSource().clear();
        this.heatmap.getSource().addFeatures(getFeatures(JSON.parse(data),this.$store.rangeCount));
      }
    });
    
  }
};
</script>

<style>
#map {
  width: 100vw;
  height: calc(100vh - 2em);
}
#date {
  position: fixed;
  z-index: 10;
  bottom: 0;
  left: 0;
  padding: 5px;
  text-align: center;
  line-height: 2em;
  background-color: #fff;
}
</style>