<template>
  <div id="menu">
    <toolbar/>
    <winclose/>
  </div>
</template>

<script>
import toolbar from "@/components/toolbar.vue"
import winclose from "@/components/winclose.vue"
export default {
  components:{
    winclose,
    toolbar
  }
};
</script>

<style>
#menu {
  -webkit-app-region: drag;
  height: 2em;
  background-color: #57606f;
  position: relative;
}
</style>