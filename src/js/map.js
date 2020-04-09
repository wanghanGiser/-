import 'ol/ol.css';
import Map from "ol/Map";
import View from "ol/View";
import TileLayer from "ol/layer/Tile";
import XYZ from "ol/source/XYZ"
import {
  fromLonLat
} from 'ol/proj';
import {
  Feature
} from 'ol';
import Point from 'ol/geom/Point';
import Heatmap from "ol/layer/Heatmap"
import VectorSource from 'ol/source/Vector';
import OverLay from "ol/Overlay"

let map = new Map({
  layers: [
    new TileLayer({
      source: new XYZ({
        url: "http://wprd0{1-4}.is.autonavi.com/appmaptile?lang=zh_cn&size=1&style=7&x={x}&y={y}&z={z}"
      })
    })
  ],
  view: new View({
    projection: "EPSG:3857",
    center: fromLonLat([104.93, 38.27]),
    zoom: 4,
    minZoom: 4
  })
})

function getHeatMap() {
  return new Heatmap({
    radius: 11,
    blur: 10
  })
}

function getSource(features) {

  return new VectorSource({
    features: features
  })
}

function getFeatures(points,num) {
  let reg = /.+(省|自治区)/;
  let features = [];
  points.forEach(i => {
    if (reg.test(i.provinceName)) {
      i.cities.forEach(j => {
        if (j.location) {
          let current=(j.currentConfirmedCount != undefined) ? j.currentConfirmedCount : j.confirmedCount;
          features.push(new Feature({
            geometry: new Point(fromLonLat(j.location.split(","))),
            currentCount: current,
            name: j.cityName,
            weight: current>num?1:(current/num)
          }))
        }
      })
    } else {
      if (i.location) {
        let current=(i.currentConfirmedCount != undefined) ? i.currentConfirmedCount : i.confirmedCount;
        features.push(new Feature({
          geometry: new Point(fromLonLat(i.location.split(","))),
          currentCount: current,
          name: i.provinceName,
          weight:current>num?1:(current/num)
        }))
      }
    }
  })
  return features
}
function getOverLay(){
  return new OverLay({
    
  });
}
export {
  map,
  getHeatMap,
  getSource,
  getFeatures,
  getOverLay
}