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
   <vue-tailwind-color-picker v-model="color" :swatches="swatches" @addSwatch="addSwatch" @deleteSwatch="deleteSwatch" />
</template>

<script>
import VueTailwindColorPicker from 'vue-tailwind-color-picker'

export default {
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
   },
   methods: {
      addSwatch(color) {
         // save new swatch
      },
      removeSwatch(color) {
         // remove swatch
      }
   }
}
</script>
```

## License
[MIT](https://choosealicense.com/licenses/mit/)