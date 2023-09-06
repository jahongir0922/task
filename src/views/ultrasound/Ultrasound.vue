<template>
  <div class="container">
    <header class="justify_between gap10">
      <div class="d_flex">
        <RouterLink to="/ultrasound">
          <img class="logo" src="../../assets/images/logo.png" alt="" />
        </RouterLink>
        <h1>Products</h1>
      </div>
      <div class="d_flex">
        <input
          v-model="search"
          @keyup="searchProduct(search)"
          class="search"
          type="text"
          placeholder="Qidirish"
        />
        <div style="position: relative">
          <div class="icon" @click="open_modal_filter()">
            <img class="iconresponse" src="../../assets/icons/filter.svg" alt="" />
          </div>
          <div ref="modal_filter" class="madal">
            <div>
              <div class="gridTemCol2" style="gap: 5px">
                <li @click="get_category(category)" class="kok_btn" v-for="category in categories">
                  {{ category }}
                </li>
              </div>
            </div>
            <div class="justify_center gap40">
              <li @click="close_modal_filter(), get_products()" class="btn_cencel">Cencel</li>
              <!-- <li @click="confirm_modal_filter()" class="btn_submit">Submit</li> -->
            </div>
          </div>
        </div>
        <RouterLink to="/cart"
          ><div class="icon"><img class="room_icon" src="../../assets/icons/cart.png" alt="" /></div
        ></RouterLink>
        <RouterLink to="/"
          ><div class="icon"><img src="../../assets/icons/logout.svg" alt="" /></div
        ></RouterLink>
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
            <span class="d_flex">
              <input v-model="quantity[index]" style="width: 50px" type="number" />
              <img
                @click="add_to_cart(product, index)"
                style="width: 30px; cursor: pointer"
                src="../../assets/icons/addcart.png"
                alt=""
                type="submit"
              />
            </span>
          </ul>
        </div>
      </div>
      <pagination @get-next-page="getPage" v-if="pages.length" :pages="pages" :page="page" />
    </div>
  </div>
</template>
<script setup>
import { ref } from 'vue'
import pagination from '../../components/pagination.vue'
import Swal from 'sweetalert2'
const products = ref([])
const limit = ref(20)
const page = ref(0)
const max_page = ref()
const pages = ref([])
const search = ref('')
const user_id = localStorage.getItem('user_id')
const quantity = ref([])
const modal_filter = ref(null)
const categories = ref([])
function searchProduct(search) {
  fetch(`https://dummyjson.com/products/search?q=${search}`)
    .then((res) => res.json())
    .then((res) => {
      if (search == '') {
        get_products()
      } else {
        products.value = [...res.products]
      }
    })
}
function open_modal_filter() {
  modal_filter.value.style.display = 'flex'
  fetch('https://dummyjson.com/products/categories')
    .then((res) => res.json())
    .then((res) => {
      categories.value = res
    })
}
function close_modal_filter() {
  modal_filter.value.style.display = 'none'
}
// function confirm_modal_filter() {
//   modal_filter.value.style.display = 'none'
// }
function get_category(category) {
  close_modal_filter()
  pages.value = []
  fetch(`https://dummyjson.com/products/category/${category}`)
    .then((res) => res.json())
    .then((res) => {
      products.value = res.products
    })
}
function add_to_cart(product, index) {
  // console.log(quantity.value[index])
  fetch('https://dummyjson.com/carts/add', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      userId: user_id,
      products: [
        {
          id: product.id,
          quantity: quantity.value[index]
        }
      ]
    })
  })
    .then((res) => res.json())
    .then(() => {
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Added to cart',
        showConfirmButton: false,
        timer: 1500
      })
    })
}
function getPage(item) {
  if (max_page.value > item && item >= 0) {
    page.value = item
    get_products()
  } else if (max_page.value < item) {
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Bu oxirgi varoq',
      showConfirmButton: false,
      timer: 1000
    })
  } else {
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Bu eng birinchi varoq',
      showConfirmButton: false,
      timer: 1000
    })
  }
}
function get_products() {
  fetch(`https://dummyjson.com/products?limit=${limit.value}&skip=${page.value * limit.value}`)
    .then((res) => res.json())
    .then((res) => {
      products.value = res.products
      console.log(res)
      max_page.value = res.total / limit.value
      pages.value = []
      for (let i = 1; i <= max_page.value; i++) {
        pages.value.push(i)
      }
    })
    .catch((err) => {
      console.log(err.message)
    })
}
get_products()
</script>
<style lang="scss" scoped></style>
