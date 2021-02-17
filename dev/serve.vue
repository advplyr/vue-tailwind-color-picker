<script>
import Vue from 'vue'
import VueTailwindColorPicker from '@/vue-tailwind-color-picker.vue'
import '../tailwind.css'

export default Vue.extend({
  name: 'ServeDev',
  components: {
    VueTailwindColorPicker
  },
  data() {
    return {
      color: '#00FF00',
      swatches: [
        '#f94144',
        '#f3722c',
        '#f8961e',
        '#f9c74f',
        '#90be6d',
        '#43aa8b',
        '#577590',
        '#22223b',
        '#4a4e69',
        '#c9ada7'
      ]
    }
  }
})
</script>

<template>
  <div id="app" class="h-screen" style="background:url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAICAYAAADED76LAAAAJElEQVQYV2NctWrVfwYkEBYWxojMZ6SDAmT7QGx0K1EcRBsFAADeG/3M/HteAAAAAElFTkSuQmCC') repeat">
    <div class="w-full h-full flex items-center justify-center" :style="{ backgroundColor: color }">
      <vue-tailwind-color-picker v-model="color" :swatches="swatches" />
    </div>
  </div>
</template>
