<template>
  <div class="container">
    <div ref="modalInfo" class="madal">
      <div class="madalContent">
        <h1 class="text_center">To'lov ma'lumotlari</h1>

        <div class="gridTemCol4">
          <li class="text_center">Yo'llanma</li>
          <li class="text_center">To'lov holati</li>
          <li class="text_center">Narx</li>
          <li class="text_center">Xulosa kiritilgan sana</li>
        </div>
        <hr />
        <div v-for="tolov in bemor_tolovlari" class="gridTemCol4">
          <li class="text_center">{{ tolov.yollanma_id?.nom }}</li>
          <li v-if="tolov.tolandi == false" class="btn_cencel">Qarzdor</li>
          <li v-if="tolov.tolandi == true" class="btn_submit">To'langan</li>
          <li class="text_center">{{ tolov.summa }}</li>
          <li class="text_center">{{ tolov.ozgartirilgan_sana }}</li>
        </div>

        <div class="justify_center gap40">
          <li @click="closeModalInfoPay()" class="kok_btn">Yopish</li>
        </div>
      </div>
    </div>
    <div ref="modalConclution" class="madal">
      <div class="madalContent xulosa">
        <h1 class="text_center">Xulosani o'zgartirish</h1>
        <div>
          <Xulosa2
            v-if="xulosamatni"
            ref="conclution"
            :xulosamatni="xulosamatni"
            :selectedTolov="selectedTolov"
            :clickedXulosa="clickedXulosa"
          />
        </div>
        <div class="justify_center gap40">
          <li @click="closeModalConclution()" class="btn_cencel">Bekor qilish</li>
          <li @click="confirmConclution()" class="kok_btn">O'zgartirish</li>
        </div>
      </div>
    </div>
    <header class="justify_between gap10">
      <div class="d_flex">
        <RouterLink to="/ultrasound">
          <img class="logo" src="../../assets/images/logo.svg" alt="" />
        </RouterLink>
        <h1>UZIdan o'tgan bemorlar ro'yxati</h1>
      </div>
      <div class="d_flex">
        <input
          v-model="search"
          @keyup.enter="searchBemor(search)"
          class="search"
          type="text"
          placeholder="Qidirish"
        />
      </div>
    </header>
    <div class="content pad10">
      <div>
        <ul class="grid_lab6">
          <li class="text_center">T/r</li>
          <li class="text_center">F.I.SH</li>
          <li class="text_center">Telefon</li>
          <li class="text_center">Manzil</li>
          <li class="text_center">To'lov holati</li>
          <li class="text_center">Xulosani o'zgartirish</li>
        </ul>
        <hr />
        <div v-for="(bemor, index) in bemorlar" :key="index">
          <ul class="grid_lab6">
            <li class="text_center">{{ index + 1 }}</li>
            <li>{{ bemor.familiya + ' ' + bemor.ism + ' ' + bemor.sharif }}</li>
            <li class="text_center">{{ bemor.tel }}</li>
            <li class="text_justify">
              {{ bemor.manzil }}
            </li>
            <li
              v-if="tolov_holati(bemor) == false"
              @click="openModalInfoPay(bemor)"
              class="justify_center btn_cencel"
            >
              Qarzdor
            </li>
            <li
              v-if="tolov_holati(bemor) == true"
              @click="openModalInfoPay(bemor)"
              class="justify_center btn_submit"
            >
              To'landi
            </li>
            <li @mouseover="get_bemor_tolovlar(bemor)" class="kok_btn">
              O'zgartirish
              <div class="dropdown">
                <div
                  v-for="tolov in bemor_tolovlari"
                  class="drop_content"
                  @click="openModalConclution(tolov)"
                >
                  {{ tolov.yollanma_id?.nom }}
                </div>
              </div>
            </li>
          </ul>
          <hr />
        </div>
      </div>
      <!-- <pagination /> -->
    </div>
  </div>
</template>
<script setup>
import { ref } from 'vue'
import pagination from '../../components/pagination.vue'
import Xulosa2 from '../../components/xulosa/Xulosa2.vue'
import axios from 'axios'
const modalConclution = ref(null)
const modalInfo = ref(null)
const bemorlar = ref([])
const bemor_tolovlari = ref([])
const conclution = ref(null)
const selectedTolov = ref()
const clickedXulosa = ref()
const xulosamatni = ref('')
const search = ref('')
var today = ''
// const day = new Date()
// const today = `${day.getFullYear()}-${String(day.getMonth() + 1).padStart(2, '0')}-${String(
//   day.getDate()
// ).padStart(2, '0')}`
function searchBemor(search) {
  axios
    .get(`/bemorlar/?qidiruv=${search}`)
    .then((res) => {
      if (search == '') {
        get_bemorlar()
      } else {
        let bemorlar_all = [...res.data]
        bemorlar.value = bemorlar_all.filter((bemor) => {
          let kiritildi = []
          if (bemor.tolovlar.length) {
            kiritildi = bemor.tolovlar.filter((tolov) => {
              return tolov.xulosa_holati == 'Kiritildi' &&
                tolov.yollanma_id?.qayerga == 'UZI' &&
                tolov.ozgartirilgan_sana == today
                ? true
                : false
            })
          }
          return kiritildi.length ? true : false
        })
      }
    })
    .catch((err) => {
      console.log(err.message)
    })
}
function tolov_holati(bemor) {
  let tolovlar_false = bemor.tolovlar.filter((item) => {
    return item.tolandi == false && item.yollanma_id?.qayerga == 'UZI' ? true : false
  })
  return tolovlar_false.length ? false : true
}
function openModalInfoPay(bemor) {
  modalInfo.value.style.display = 'flex'
  get_bemor_tolovlar(bemor)
}
function closeModalInfoPay() {
  modalInfo.value.style.display = 'none'
}
function openModalConclution(tolov) {
  modalConclution.value.style.display = 'flex'
  selectedTolov.value = tolov
  getXulosa(tolov)
}
function closeModalConclution() {
  modalConclution.value.style.display = 'none'
  xulosamatni.value = ''
}
function confirmConclution() {
  conclution.value.patchXulosa()
  closeModalConclution()
  get_bemorlar()
}
function getXulosa(tolov) {
  axios
    .get(`/xulosalar/?bemor_id=${tolov.bemor_id}`)
    .then((res) => {
      let xulosalar = [...res.data]
      let tolov_xulosa = xulosalar.filter((xulosa) => {
        return xulosa.tolov_id.id == selectedTolov.value.id
      })
      xulosamatni.value = tolov_xulosa[0].xulosa_matni
      clickedXulosa.value = tolov_xulosa[0]
    })
    .catch((err) => {
      console.log(err.message)
    })
}
function get_bemorlar() {
  bemorlar.value = []
  axios
    .get(`/bemorlar/?qayerga=UZI&xulosa_holati=Kiritildi&ozgartirilgan_sana=${today}`)
    .then((res) => {
      bemorlar.value = [...res.data]
    })
    .catch((err) => {})
}
function get_bemor_tolovlar(bemor) {
  let bemor_tolovlari_xulosa_kutyapti = bemor.tolovlar.filter((tolov) => {
    return (tolov.xulosa_holati == 'Kiritildi' &&
      tolov.yollanma_id?.qayerga == 'UZI' &&
      tolov.ozgartirilgan_sana == today) ||
      (tolov.xulosa_holati == 'Kiritildi' &&
        tolov.yollanma_id?.qayerga == 'UZI' &&
        tolov.tolandi == false)
      ? true
      : false
  })
  bemor_tolovlari.value = bemor_tolovlari_xulosa_kutyapti
}
function get_today() {
  axios
    .get('sana')
    .then((res) => {
      today = res.data.sana
      console.log(today)
      get_bemorlar()
    })
    .catch((err) => {
      console.log(err.message)
    })
}
get_today()
</script>

<style lang="scss" scoped></style>
