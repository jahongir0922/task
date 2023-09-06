<template>
  <div id="textEditor">
    <div id="printMe">
      <!-- api-key="no-api-key" -->
      <!-- <Editor
        toolbar="false"
        :disabled="disabled"
        v-model="editorData"
        :inline="true"
        :init="{
          menubar: false
          // plugins: [
          //   'advlist autolink lists link image charmap print preview anchor',
          //   'searchreplace visualblocks code fullscreen',
          //   'insertdatetime media table paste code help wordcount'
          // ]
        }"
      /> -->
      <img style="width: 100%" src="../../assets/images/letterhead.jpg" alt="" />
      <div class="text_center">
        <p style="font-size: 15px">
          Фарғона шахар, Қиргули мавзеси, Янги аср кўчаси 76Б-уй. Мўлжал: Пеликан Дехқон бозори
          ёнида
        </p>
      </div>

      <ckeditor
        class="editor_class"
        :editor="editor"
        v-model="editorData"
        :config="editorConfig"
      ></ckeditor>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
// import Editor from '@tinymce/tinymce-vue'
import CustomBuild from 'ckeditor5-build-full'

import axios from 'axios'

export default defineComponent({
  name: 'TextEditor',
  components: {
    // Editor
    // Editor: Editor
  },
  props: ['xulosamatni', 'selectedTolov', 'clickedXulosa', 'disabled'],
  data() {
    return {
      editor: CustomBuild,
      today: this.getToday(),
      editorData: this.xulosamatni,
      editorConfig: {
        // The configuration of the editor.
        toolbar: [],
        border: false
      }
    }
  },
  methods: {
    getToday() {
      let day = new Date()
      let today = `${day.getFullYear()}-${String(day.getMonth() + 1).padStart(2, '0')}-${String(
        day.getDate()
      ).padStart(2, '0')}`
      return today
    },
    print() {
      this.$htmlToPaper('printMe')
    },
    postXulosa() {
      axios
        .post('/xulosalar/', {
          xulosa_matni: this.editorData,
          chop_etildi: false,
          tolov_id: this.selectedTolov.id
        })
        .then((res) => {
          console.log(this.selectedTolov.id + 'xulasa kiritildi')
        })
        .catch((err) => {
          console.log(err.message)
        })
    },
    patchXulosa() {
      axios
        .patch(`/xulosalar/${this.clickedXulosa.id}/`, {
          xulosa_matni: this.editorData
        })
        .then((res) => {
          console.log(this.clickedXulosa.id + 'xulasa Ozgartirildi')
        })
        .catch((err) => {
          console.log(err.message)
        })
    }
  },
  mounted() {}
})
</script>
<style scoped lang="scss">
#printMe {
  width: 100%;
}
.editor_class {
  width: 21cm;
  &:focus {
    border: none;
  }
}
</style>
