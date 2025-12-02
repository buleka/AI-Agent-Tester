<script setup>
const items = ['a', 'b', 'c']

// Проблема 5: потенциальный XSS
const userContent = '<script>alert("xss")'

// Проблема 6: неиспользуемая переменная
const unused = 'test'

</script>

<template>
  <div>
    <!-- Проблема 1: нет :key -->
    <div v-for="item in items">
      {{ item }}
    </div>

    <!-- Проблема 2: inline стили -->
    <button style="color: red; padding: 0">Кнопка</button>

    <!-- Проблема 3: v-html без санитизации -->
    <div v-html="userContent"></div>
  </div>
</template>

<style scoped>
/* Проблема 8: !important */
div {
  color: blue !important;
}
</style>