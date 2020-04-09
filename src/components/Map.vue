<template>
  <div id="map">
    <div id="popup" class="ol-popup">
      <a href="#" id="popup-closer" class="ol-popup-closer"></a>
      <div id="popup-content"></div>
    </div>
    <div id="date">当前日期:{{date}}</div>
  </div>
</template>

<script>
import {
  map,
  getHeatMap,
  getSource,
  getFeatures,
  getOverLay
} from "@/js/map.js";
const { ipcRenderer } = require("electron");
export default {
  name: "map1",
  data() {
    return {
      date: "",
      heatmap: undefined
    };
  },
  mounted() {
    map.setTarget("map");
    let overlay = getOverLay();
    console.log(overlay);
    overlay.setElement(document.getElementById("popup"));
    overlay.setMap(map);
    ipcRenderer.on("data", (event, data, date) => {
      this.date = date;
      if (!this.heatmap) {
        this.heatmap = getHeatMap();
        this.heatmap.setSource(
          getSource(getFeatures(JSON.parse(data), this.$store.rangeCount))
        );
        map.addLayer(this.heatmap);
      } else {
        this.heatmap.getSource().clear();
        this.heatmap
          .getSource()
          .addFeatures(getFeatures(JSON.parse(data), this.$store.rangeCount));
      }
    });
    map.on("pointermove", e => {
      let feature = map.forEachFeatureAtPixel(e.pixel, feature => {
        return feature;
      });
      if (feature) {
        document.getElementById("popup").innerText =
          feature.get("name") + "   " + feature.get("currentCount")+"例";
        overlay.setPosition(e.coordinate);
      } else {
        overlay.setPosition(undefined);
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
.ol-popup {
  position: absolute;
  background-color: white;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.2);
  padding: 15px;
  border-radius: 10px;
  border: 1px solid #cccccc;
  bottom: 12px;
  left: -50px;
  min-width: 5em;
}
.ol-popup:after,
.ol-popup:before {
  top: 100%;
  border: solid transparent;
  content: " ";
  height: 0;
  width: 0;
  position: absolute;
  pointer-events: none;
}
.ol-popup:after {
  border-top-color: white;
  border-width: 10px;
  left: 48px;
  margin-left: -10px;
}
.ol-popup:before {
  border-top-color: #cccccc;
  border-width: 11px;
  left: 48px;
  margin-left: -11px;
}
.ol-popup-closer {
  text-decoration: none;
  position: absolute;
  top: 2px;
  right: 8px;
}
.ol-popup-closer:after {
  content: "✖";
}
</style>