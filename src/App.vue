<template>
  <div id="app">
    <Menu></Menu>
    <Map></Map>
  </div>
</template>

<script>
import Map from "@/components/Map.vue";
import Menu from "@/components/menu.vue";
const { ipcRenderer } = require("electron");
export default {
  name: "App",
  data(){
    return{
    }
  },
  components: {
    Map,
    Menu
  },
  created(){
    ipcRenderer.on("response",(event,str)=>{
      this.msg=str
    })
  },
  methods:{
    getdata(){
      this.msg=ipcRenderer.sendSync("syn")
    }
  }
};
</script>

<style>
*{
  margin: 0;
  padding: 0;
}
</style>
