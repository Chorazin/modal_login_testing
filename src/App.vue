<template>
  <div id="app">
    <navbar_top />
    <router-view/>
  </div>
</template>

<script>
// @ is an alias to /src
import navbar_top from '@/components/navbar_top.vue'

export default {
  components: {
    navbar_top
  }
}

</script>

<style>

</style>
