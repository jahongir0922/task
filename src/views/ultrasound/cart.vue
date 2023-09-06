<template>
  <div class="container">
    <header class="justify_between gap10">
      <div class="d_flex">
        <RouterLink to="/ultrasound">
          <img class="logo" src="../../assets/images/logo.png" alt="" />
        </RouterLink>
        <h1>Davolanayotgan bemorlar ro'yxati</h1>
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
    <div class="">
      <div class="gridTemCol4">
        <div class="content pad10" v-for="(product, index) in products" :key="index">
          <img style="width: 100%; height: 200px" :src="product.thumbnail" alt="" />
          <li>Category: {{ product.category }}</li>
          <li>Brand: {{ product.brand }}</li>
          <li>Name: {{ product.title }}</li>
          <ul class="justify_between">
            <li>Price: {{ product.price }} $</li>
            <li class="btn_submit">Buy now</li>
          </ul>
        </div>
      </div>
      <!-- <pagination @get-next-page="getPage" v-if="pages.length" :pages="pages" :page="page" /> -->
    </div>
  </div>
</template>
<script setup>
import { ref } from 'vue'
import axios from 'axios'
import Swal from 'sweetalert2'
import pagination from '../../components/pagination.vue'

const user_id = localStorage.getItem('user_id')
const products = ref([])

const search = ref('')
get_products_from_cart()
function get_products_from_cart() {
  fetch(`https://dummyjson.com/carts/user/${user_id}`)
    .then((res) => res.json())
    .then((res) => {
      console.log(res)
      products.value = res.carts[0].products
    })
}
</script>

<style lang="scss" scoped></style>
