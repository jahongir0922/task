<template>
  <div class="fd_column gap10 pad20 content">
    <!-- SOURCE -->
    <div id="printDirection">
      <img style="width: 100%" src="../assets/images/letterhead.jpg" alt="" />
      <div class="text_center">
        <p style="font-size: 15px">
          Фарғона шахар, Қиргули мавзеси, Янги аср кўчаси 76Б-уй. Мўлжал: Пеликан Дехқон бозори
          ёнида
        </p>
      </div>
      <div id="printContent" class="fd_column gap10">
        <h2 class="text_center">Yo'llanma</h2>
        <ul class="justify_between">
          <li>
            {{ today.getDate() + ' ' + months[today.getMonth()] + ' ' + today.getFullYear() }}
          </li>
        </ul>
        <ul class="d_flex">
          <b>{{ ism + ' ' + familiya }}</b>
        </ul>
        <ul class="justify_between">
          <li>Yo'llanmalar</li>
          <!-- <li>Xona</li> -->
        </ul>
        <hr />
        <ul v-for="direction in directions" class="justify_between">
          <li>{{ direction.nom }}</li>
          <!-- <li>{{ direction.qayerga }}</li> -->
        </ul>
      </div>
    </div>
    <!-- OUTPUT -->
    <button class="btn_history" @click="$emit('completeprint'), print()">Print</button>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  props: ['directions', 'ism', 'familiya'],
  name: 'chek',
  components: {
    // HelloWorld
  },
  data() {
    return {
      today: new Date(),
      months: [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December'
      ]
    }
  },
  methods: {
    print() {
      this.$htmlToPaper('printDirection')
    }
  }
})
</script>
<style lang="scss" scoped></style>
