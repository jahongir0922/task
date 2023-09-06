<template>
  <div class="fd_column gap10 pad20 content">
    <div id="printChek">
      <div id="printContent" class="fd_column gap10">
        <h2 class="text_center">{{ dublicate }}</h2>
        <h2 class="text_center">Kvitansiya №{{ tolovlar_chek.id }}</h2>
        <ul class="justify_between">
          <li>{{ tolovlar_chek.sana }}</li>
        </ul>
        <ul class="d_flex">
          <b>F.I.Sh</b>
          <b>{{ bemor?.ism + ' ' + bemor?.familiya + ' ' + bemor?.sharif }}</b>
        </ul>
        <ul class="justify_between">
          <li>To'lov maqsadi</li>
          <li>Xizmat narxi</li>
        </ul>
        <hr />
        <!-- <ul v-for="(tolov, index) in xona_tolovi" :key="index" class="text_center gridTemCol3">
          <li>{{ getXona(tolov.joy_id, index) }}</li>
          <li>{{ today }}</li>
          <li>{{ tolov.summa }}</li>
        </ul> -->
        <ul v-for="maqsad in tolovlar_chek.tolov_maqsadlar" class="justify_between">
          <li>{{ maqsad.maqsad }}</li>
          <li>{{ maqsad.summa }}</li>
        </ul>
        <ul class="justify_between">
          <li>Jami -</li>
          <li>
            {{ get_chek_summa(tolovlar_chek.tolov_maqsadlar) }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import axios from 'axios'
export default defineComponent({
  props: ['dublicate', 'tolovlar_chek', 'xona_tolovi', 'bemor'],
  name: 'chek',
  components: {
    // HelloWorld
  },
  data() {
    return {
      today: this.getToday(),
      xona: []
    }
  },
  methods: {
    get_chek_summa(chek_tolov_maqsadlar) {
      let chek_summa = 0
      for (let i in chek_tolov_maqsadlar) {
        chek_summa += chek_tolov_maqsadlar[i].summa
      }
      return chek_summa
    },
    getXona(joylashtirish_id, index) {
      axios
        .get(`/joylashtirishlar/${joylashtirish_id}`)
        .then((res) => {
          let joylashtirish = res.data
          this.xona.push(
            `Xonaturi ${joylashtirish.xona_id.turi}, ${joylashtirish.xona_id.qavat}-qavat, ${joylashtirish.xona_id.raqami}-xona, xonadan ${joylashtirish.yotgan_kun_soni} kun foydalandi`
          )
        })
        .catch((err) => {})
      return this.xona[index]
    },
    getToday() {
      let day = new Date()
      let today = `${day.getFullYear()}-${String(day.getMonth() + 1).padStart(2, '0')}-${String(
        day.getDate()
      ).padStart(2, '0')}`
      return today
    },
    print() {
      this.$htmlToPaper('printChek')
    }
  }
})
</script>

<style lang="scss" scoped></style>
