<script setup>
import { ref, computed } from 'vue'

const products = ref([])
const searchQuery = ref('')

// ❌ ПРОБЛЕМА 1: O(n²) вместо O(n)
const getProductsWithCategories = computed(() => {
  const categories = [
    { id: 1, name: 'Category 1' },
    { id: 2, name: 'Category 2' }
  ]

  return products.value.map(product => {
    const category = categories.find(c => c.id === product.categoryId)
    return {
      ...product,
      categoryName: category?.name
    }
  })
})

// ❌ ПРОБЛЕМА 2: Магические числа
const getTopProducts = () => {
  return products.value
      .sort((a, b) => b.rating - a.rating)
      .slice(0, 10) // Почему 10?
      .filter(p => p.price > 50) // Почему 50?
}

// ❌ ПРОБЛЕМА 3: Мутация массива
const sortProducts = () => {
  return products.value.sort((a, b) => a.price - b.price)
}

// ❌ ПРОБЛЕМА 4: Отсутствие debounce
const handleSearch = async (query) => {
  const response = await fetch(`/api/search?q=${query}`)
  products.value = await response.json()
}

// ❌ ПРОБЛЕМА 5: Множественные проходы
const getStats = computed(() => {
  const active = products.value.filter(p => p.status === 'active')
  const inactive = products.value.filter(p => p.status === 'inactive')
  const total = active.length + inactive.length
  return { active, inactive, total }
})
</script>

<template>
  <div class="demo-container">
    <!-- Компонент для демо -->
    <div class="demo-header">
      <h2 class="demo-title">CodeRabbit Demo</h2>
    </div>

    <input
        v-model="searchQuery"
        @input="handleSearch(searchQuery)"
        class="search-input"
        placeholder="Search..."
    >

    <div class="product-grid">
      <div
          v-for="product in getTopProducts()"
          :key="product.id"
          class="product-card"
      >
        <div class="card-content">
          <h3 class="card-title">{{ product.name }}</h3>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
/* ========================================
   ДЕМО КОМПОНЕНТ ДЛЯ CODERABBIT
   Содержит намеренные проблемы для презентации
   ======================================== */

// ❌ ПРОБЛЕМА 1: Магические числа
.demo-container {
  padding: 23px;
  margin: 17px;
  max-width: 1247px; // Почему именно 1247?
}

// ❌ ПРОБЛЕМА 2: Глубокая вложенность (>3 уровней)
.demo-header {
  .demo-title {
    .title-text {
      .title-icon {
        .icon-svg {
          color: red; // 5 уровней!
        }
      }
    }
  }
}

// ❌ ПРОБЛЕМА 3: Дублирование цветов (нет CSS переменных)
.product-card {
  background: #3b82f6;
  border: 2px solid #3b82f6;

  &:hover {
    background: #2563eb;
  }
}

.search-input {
  border-color: #3b82f6;

  &:focus {
    border-color: #2563eb;
  }
}

// ❌ ПРОБЛЕМА 4: !important без причины
.modal {
  z-index: 9999 !important;
  position: fixed !important;
}

// ❌ ПРОБЛЕМА 5: Неспецифичные селекторы
div {
  box-sizing: border-box; // Затронет все div
}

// ❌ ПРОБЛЕМА 6: Z-index хаос
.header { z-index: 100; }
.dropdown { z-index: 1000; }
.tooltip { z-index: 99999; }

// ❌ ПРОБЛЕМА 7: Дублирование кода
.card-1 {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
}

.card-2 {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
}

// ❌ ПРОБЛЕМА 8: calc() без комментариев
.content {
  width: calc(100% - 47px); // Почему 47?
  height: calc(100vh - 123px); // Почему 123?
}

// ❌ ПРОБЛЕМА 9: Хардкод брейкпоинтов
@media (max-width: 768px) {
  .product-card { width: 250px; }
}

@media (max-width: 767px) {
  .content { padding: 15px; }
}

// ❌ ПРОБЛЕМА 10: transition: all (медленно)
.button {
  transition: all 0.3s ease;
}

// ❌ ПРОБЛЕМА 11: Отсутствие :focus стилей
.button {
  outline: none; // Плохо для accessibility
}

// ❌ ПРОБЛЕМА 12: Магические числа в box-shadow
.card {
  box-shadow: 0 3px 7px rgba(0, 0, 0, 0.15);
  // Почему эти конкретные значения?
}
</style>