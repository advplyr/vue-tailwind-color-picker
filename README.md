# Vue Tailwind Color Picker

Color picker for vue using Tailwind v2.

**Requires Tailwind**

## [Live demo](https://mcoop320.github.io/vue-tailwind-color-picker/)

<img src="https://raw.githubusercontent.com/mcoop320/vue-tailwind-color-picker/master/sample.png" />

## Installation

```bash
$ npm install vue-tailwind-color-picker
```

## Usage

```js
<template>
   <vue-tailwind-color-picker v-model="color" :swatches.sync="swatches" :hide-swatches="false" @change="changedColor" @addSwatch="swatchAdded" @deleteSwatch="swatchDeleted" />
</template>

<script>
import VueTailwindColorPicker from 'vue-tailwind-color-picker.vue'

export default {
  components: {
    VueTailwindColorPicker
  },
  data() {
    return {
      color: '#00FF00FF',
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
  },
  methods: {
    changedColor(color) {
      console.warn('Changed Color', color)
    },
    swatchAdded(color) {
      console.log('Swatch Added', color)
    },
    swatchDeleted(color) {
      console.log('Swatch Deleted', color)
    }
  }
}
</script>
```

## License
[MIT](https://choosealicense.com/licenses/mit/)