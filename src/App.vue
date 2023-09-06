<script setup>
import { ref } from 'vue'
import { RouterView } from 'vue-router'

const title = ref('hello world')
</script>

<template>
  <div id="root">
    <RouterView />
  </div>
</template>

<style scoped lang="scss"></style>
