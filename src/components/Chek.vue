<template>
  <div class="fd_column gap10 pad20 content">
    <!-- SOURCE -->
    <div id="printChek">
      <div id="printContent" class="fd_column gap10">
        <h2 class="text_center">Kvitansiya №{{ cheknumber }}</h2>
        <ul class="justify_between">
          <li>{{ today + ' ' + time }}</li>
        </ul>
        <ul class="d_flex">
          <b>F.I.Sh</b>
          <b>{{ bemor?.ism + ' ' + bemor?.familiya + ' ' + bemor?.sharif }}</b>
        </ul>
        <ul class="text_center justify_between">
          <li>To'lov maqsadi</li>
          <li>Xizmat narxi</li>
        </ul>
        <hr />
        <ul v-for="(tolov, index) in xona_tolovi" :key="index" class="text_center justify_between">
          <li>{{ tolov.xona_turi }}</li>
          <li>{{ tolov.summa }}</li>
        </ul>
        <ul v-for="tolov in tasdiqlangan_tolovlar" class="text_center justify_between">
          <li>{{ tolov.yollanma_id?.nom }}</li>
          <li>{{ tolov.summa }}</li>
        </ul>
        <ul class="justify_between">
          <b>Jami -</b>
          <b>
            {{ get_chek_summa(tasdiqlangan_tolovlar) }}
          </b>
        </ul>
        <li class="pad20"></li>
        <hr style="border-bottom: 1px dashed black" />
      </div>
    </div>
    <!-- OUTPUT -->
    <!-- <button class="btn_history" @click="print()">Print</button> -->
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  props: ['tasdiqlangan_tolovlar', 'cheknumber', 'xona_tolovi', 'bemor', 'today', 'time'],
  name: 'chek',
  components: {
    // HelloWorld
  },
  data() {
    return {
    }
  },
  methods: {
    get_chek_summa(tasdiqlangan_tolovlar) {
      let chek_summa = 0
      for (let i in tasdiqlangan_tolovlar) {
        chek_summa += tasdiqlangan_tolovlar[i].summa
      }
      return chek_summa
    },
    print() {
      this.$htmlToPaper('printChek')
    }
  },
  mounted() {}
})
</script>

<style lang="scss" scoped>
#printContent {
  // padding: 20px;
}
</style>
