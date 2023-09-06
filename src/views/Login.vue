<template>
  <div id="sign_in">
    <div id="sign_in_card">
      <img class="logo_img" src="../assets/images/logo.png" alt="" />
      <h1 class="company_name">Web bro interview</h1>
      <form @submit.prevent="handleSubmit()" action="">
        <input class="login-input" type="text" placeholder="Login" v-model="username" />
        <input class="login-input" type="password" placeholder="Parol" v-model="password" />
        <button class="login-btn">Kirish</button>
      </form>
    </div>
    <div class="fd_column">
      <!-- <RouterLink class="btn_pointer" to="/ultrasound"
        ><img src="../assets/images//roles/ultrasound.svg" alt=""
      /></RouterLink> -->
    </div>
  </div>
</template>
<script setup>
import { ref } from 'vue'
import axios from 'axios'
import Swal from 'sweetalert2'
localStorage.removeItem('token')
localStorage.removeItem('role')
const username = ref('kminchelle')
const password = ref('0lelplR')
function handleSubmit() {
  fetch('https://dummyjson.com/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      username: username.value,
      password: password.value
      // expiresInMins: 60, // optional
    })
  })
    .then((res) => res.json())
    .then((res) => {
      console.log(res)
      if (res.username == 'kminchelle') {
        localStorage.setItem('token', res.token)
        localStorage.setItem('role', res.username)
        localStorage.setItem('user_id', res.id)
        location.href = '/ultrasound'
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Login yoki parol xato'
        })
      }
    })
    .catch(() => {
      Swal.fire({
        icon: 'error',
        title: 'Login yoki parol xato'
      })
    })
}
</script>
<style scoped lang="scss">
#sign_in {
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 40px;
  padding: 30px 10px;
  background-color: $main_fon;
  background-image: url('../assets/images/login_fon.svg');
  background-size: 90%;
  background-repeat: no-repeat;
  background-position: top;
  @include media('<=LGdesktop') {
  }
  #sign_in_card {
    width: 500px;
    height: auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 40px;
    padding: 50px 50px;
    background-color: $kok;
    border-radius: 10px;
    .logo_img {
      width: 150px;
      height: 150px;
      border-radius: 50%;
    }
    .company_name {
      font-size: 36px;
      font-weight: 600;
      color: #fff;
    }
    form {
      width: 100%;
      display: flex;
      flex-direction: column;
      gap: 20px;
      .login-input {
        appearance: none;
        width: 100%;
        padding: 13px 16px;
        border: none;
        background-color: $oq;
        border-radius: 5px;
        font-size: 15px;
        font-weight: 500;
        line-height: 1.4;
        color: var();
        transition: border 0.25s ease-in-out, color 0.25s ease-in-out;
        &:focus {
          box-shadow: 0px 0px 15px black;
          outline: 1px solid #171818;
        }
      }
      .login-btn {
        padding: 13px 16px;
        background-color: $oq;
        color: $text_black;
        border-radius: 5px !important;

        &:focus {
          box-shadow: 0px 0px 15px $text_black;
          outline: 1px solid $text_black;
        }
        &:hover {
          box-shadow: 0px 0px 15px $text_black;
        }
        &:active {
          box-shadow: 0px 0px 15px $oq;
          color: $oq;
          background-color: $kok;
        }
      }
      a {
        font-size: 15px;
        font-weight: 500;
        text-align: center;
        color: #1e88e5;
      }
      .form_links {
        display: flex;
        justify-content: center;
        gap: 10px;
        > div {
          border-left: 1px solid #171818;
        }
      }
    }
  }
}
</style>
