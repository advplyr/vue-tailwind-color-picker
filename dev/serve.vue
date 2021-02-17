<script>
import Vue from 'vue';
import VueTailwindColorPicker from '@/vue-tailwind-color-picker.vue';

export default Vue.extend({
  name: 'ServeDev',
  components: {
    VueTailwindColorPicker
  }
});
</script>

<template>
  <div id="app">
    <vue-tailwind-color-picker />
  </div>
</template>
