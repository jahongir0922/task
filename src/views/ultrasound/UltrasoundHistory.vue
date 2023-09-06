<template>
  <div class="container patient">
    <header class="justify_between gap10">
      <div class="d_flex">
        <RouterLink to="/ultrasound">
          <img class="logo" src="../../assets/images/logo.svg" alt="" />
        </RouterLink>
        <h1>{{ $route.params.ism + ' ' + $route.params.familiya + 'ning' }} xulosalari</h1>
      </div>
    </header>
    <div class="patient_history">
      <div class="directions_and_conclusions content">
        <div class="fd_column gap20">
          <h1>Xulosalar</h1>
          <ul class="grid_conclutions">
            <li>Yo'llanma nomi</li>
            <li class="text_center">Xulosa sanasi</li>
            <li class="text_center">Xulosa</li>
          </ul>
          <hr />
          <ul v-for="bemor_xulosasi in bemor_xulosalari" class="grid_conclutions">
            <li>{{ bemor_xulosasi.tolov_id.yollanma_id?.nom }}</li>
            <li class="text_center">{{ bemor_xulosasi.sana }}</li>
            <li @click="xulosani_korish(bemor_xulosasi)" class="kok_btn">Ko'rish</li>
          </ul>
        </div>
      </div>
      <div class="view_conclusion fd_column justify_between gap20 content pad20">
        <div class="justify_between">
          <h1 class="text_center">Xulosa jadvali</h1>
          <li @click="printConclution()" class="kok_btn">Chop etish</li>
        </div>
        <Xulosa2 v-if="xulosamatni" ref="conclution" :xulosamatni="xulosamatni" :disabled="true" />
      </div>
    </div>
  </div>
</template>

<script setup>
import Xulosa2 from '../../components/xulosa/Xulosa2.vue'
import { ref } from 'vue'
import axios from 'axios'
import { useRoute } from 'vue-router'
const route = useRoute()
const conclution = ref(null)
const bemor_xulosalari = ref([])
const xulosamatni = ref('')
function printConclution() {
  conclution.value.print()
  xulosamatni.value = ''
}
function get_bemor_xulosalari() {
  axios
    .get(`/xulosalar/?bemor_id=${route.params.id}`)
    .then((res) => {
      bemor_xulosalari.value = [...res.data]
    })
    .catch((err) => {
      console.log(err.message)
    })
}
function xulosani_korish(xulosa) {
  xulosamatni.value = ''
  axios
    .get(
      `/xulosalar/${xulosa.id}/`
      // ,{tolov_id: xulosa.tolov_id.id, chop_etildi: true}
    )
    .then((res) => {
      xulosamatni.value = xulosa.xulosa_matni
      get_bemor_xulosalari()
    })
    .catch((err) => {
      console.log(err.message)
    })
}
get_bemor_xulosalari()
</script>
<style lang="scss" scoped></style>
