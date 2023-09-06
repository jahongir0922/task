<template>
  <div id="pagination">
    <ul class="d_flex pad10">
      <li @click="$emit('getNextPage', 0)" class="previous_next">
        {{ '<<' }}
      </li>
      <li @click="$emit('getNextPage', page-1)" class="previous_next">
        {{ '<' }}
      </li>
      <li class="pag_active">
        {{ page + 1 }}
      </li>
      <!-- <ul class="first_active">
        <li
          v-for="(item, index) in pages"
          @click="get_active_item(item), $emit('getNextPage', item)"
          ref="pag_item"
          :key="index"
          class="default_pag_item"
        >
          {{ index + 1 }}
        </li>
      </ul> -->
      <li @click="$emit('getNextPage', page + 1)" class="previous_next">
        {{ '>' }}
      </li>
      <li @click="$emit('getNextPage', pages.length-1)" class="previous_next">
        {{ '>>' }}
      </li>
    </ul>
  </div>
</template>
<script setup>
import { ref } from 'vue'
const props = defineProps(['page', 'pages'])
const pag_item = ref([])
function get_active_item(index) {
  pag_item.value[index].classList.add('pag_active')
  pag_item.value[index].classList.remove('pag_item')
  for (let i in pag_item.value) {
    if (index == i) continue
    pag_item.value[i].classList.add('pag_item')
    pag_item.value[i].classList.remove('pag_active')
  }
}
</script>

<style lang="scss" scoped>
#pagination {
  display: flex;
  padding-right: 20px;
  justify-content: flex-end;
}
.first_active {
  display: flex;
  gap: 10px;
}
.first_active :first-child {
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: $oq;
  background-color: $kok;
  border-radius: 5px;
}
.default_pag_item {
  cursor: pointer;
  user-select: none;
  display: flex;
  justify-content: center;
  align-items: center;
  color: $text_black;
  width: 40px;
  height: 40px;
  border-radius: 5px;
  border: 2px solid $hr;
  background-color: transparent;
  &:hover {
    background-color: $kok;
    color: $oq;
  }
  &:active {
    background-color: transparent;
    color: $text_black;
  }
}
.pag_active {
  cursor: pointer;
  user-select: none;
  display: flex;
  justify-content: center;
  align-items: center;
  color: $oq !important;
  width: 40px;
  height: 40px;
  border-radius: 5px;
  background-color: $kok !important;
  &:hover {
    background-color: $kok;
    color: $oq;
  }
  &:active {
    background-color: transparent;
    color: $text_black;
  }
}
.pag_item {
  cursor: pointer;
  user-select: none;
  display: flex;
  justify-content: center;
  align-items: center;
  color: $text_black !important;
  width: 40px;
  height: 40px;
  border-radius: 5px;
  border: 2px solid $hr;
  background-color: transparent !important;
  &:hover {
    background-color: $kok;
    color: $oq;
  }
  &:active {
    background-color: transparent;
    color: $text_black;
  }
}

.previous_next {
  cursor: pointer;
  user-select: none;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
  border-radius: 5px;
  height: 40px;
  border: 2px solid $hr;
  color: $text_black;
  &:hover {
    background-color: $kok;
    color: $oq;
  }
  &:active {
    background-color: transparent;
    color: $text_black;
  }
}
</style>
