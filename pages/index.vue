<!-- pages/index.vue -->
<template>
  <div class="container">
    <header class="header">
      <h1 data-testid="main-title">🤖 AI Agent Tester</h1>
      <p class="subtitle">Тестовый проект для Momentic AI и CodeRabbit</p>
    </header>

    <nav class="navigation">
      <ul>
        <li>
          <NuxtLink
              to="/testing"
              data-testid="test-link"
              class="nav-link"
          >
            🧪 Тестирование CodeRabbit
          </NuxtLink>
        </li>
        <li>
          <a href="#" class="nav-link" @click.prevent="showAbout">
            ℹ️ О проекте
          </a>
        </li>
        <li>
          <a href="#" class="nav-link" @click.prevent="toggleTheme">
            🌓 Сменить тему
          </a>
        </li>
      </ul>
    </nav>

    <main class="main-content">
      <section class="hero">
        <h2>Добро пожаловать!</h2>
        <p>
          Этот проект создан для тестирования AI-инструментов:
        </p>

        <div class="features">
          <div class="feature-card">
            <div class="feature-icon">🤖</div>
            <h3>Momentic AI</h3>
            <p>Автономное E2E тестирование с помощью AI</p>
            <button
                class="feature-btn"
                @click="simulateMomenticTest"
                data-testid="momentic-btn"
            >
              Запустить тест
            </button>
          </div>

          <div class="feature-card">
            <div class="feature-icon">🐰</div>
            <h3>CodeRabbit</h3>
            <p>AI-ассистент для code review</p>
            <button
                class="feature-btn"
                @click="navigateToTesting"
            >
              Проверить код
            </button>
          </div>

          <div class="feature-card">
            <div class="feature-icon">🔍</div>
            <h3>Скриншот тесты</h3>
            <p>Визуальная регрессия и проверка UI</p>
            <button
                class="feature-btn"
                @click="takeScreenshot"
                data-testid="screenshot-btn"
            >
              Сделать скриншот
            </button>
          </div>
        </div>
      </section>

      <section class="stats">
        <h3>Статистика проекта:</h3>
        <div class="stats-grid">
          <div class="stat-item">
            <span class="stat-number">{{ testCount }}</span>
            <span class="stat-label">тестов создано</span>
          </div>
          <div class="stat-item">
            <span class="stat-number">{{ componentsCount }}</span>
            <span class="stat-label">компонентов</span>
          </div>
          <div class="stat-item">
            <span class="stat-number">{{ issuesFound }}</span>
            <span class="stat-label">проблем найдено</span>
          </div>
        </div>
      </section>

      <section class="interactive">
        <h3>Интерактивные элементы для тестов:</h3>

        <div class="form-group">
          <label for="test-input">Тестовое поле ввода:</label>
          <input
              id="test-input"
              v-model="testInput"
              placeholder="Введите текст для теста..."
              data-testid="test-input"
              class="form-input"
          />
          <p class="input-hint" v-if="testInput">
            Вы ввели: <strong>{{ testInput }}</strong>
          </p>
        </div>

        <div class="button-group">
          <button
              class="btn primary"
              @click="showNotification('Первичная кнопка нажата!')"
              data-testid="primary-btn"
          >
            🟢 Первичная кнопка
          </button>

          <button
              class="btn secondary"
              @click="toggleCounter"
              data-testid="counter-btn"
          >
            🔄 Счётчик: {{ counter }}
          </button>

          <button
              class="btn danger"
              @click="showError"
              data-testid="error-btn"
          >
            🚨 Создать ошибку
          </button>
        </div>

        <div class="checkbox-group">
          <label>
            <input
                type="checkbox"
                v-model="checkboxes.option1"
                data-testid="checkbox-1"
            />
            Опция 1
          </label>
          <label>
            <input
                type="checkbox"
                v-model="checkboxes.option2"
                data-testid="checkbox-2"
            />
            Опция 2
          </label>
          <label>
            <input
                type="checkbox"
                v-model="checkboxes.option3"
                data-testid="checkbox-3"
            />
            Опция 3
          </label>
        </div>

        <div class="dropdown">
          <label for="test-select">Выпадающий список:</label>
          <select
              id="test-select"
              v-model="selectedOption"
              data-testid="test-select"
              class="form-select"
          >
            <option value="">Выберите опцию</option>
            <option value="vue">Vue.js</option>
            <option value="nuxt">Nuxt 3</option>
            <option value="momentic">Momentic AI</option>
            <option value="coderabbit">CodeRabbit</option>
          </select>
          <p v-if="selectedOption">
            Вы выбрали: <strong>{{ selectedOption }}</strong>
          </p>
        </div>
      </section>
    </main>

    <footer class="footer">
      <p>© 2024 AI Agent Tester Project | Сделано для тестирования Momentic AI</p>
      <p class="footer-hint">
        Эта страница специально создана для AI-тестирования со множеством элементов
      </p>
    </footer>

    <!-- Модальное окно -->
    <div v-if="showModal" class="modal-overlay" @click="closeModal">
      <div class="modal" @click.stop>
        <h3>ℹ️ О проекте</h3>
        <p>
          Этот проект демонстрирует возможности:
        </p>
        <ul>
          <li>🤖 Momentic AI для автономного тестирования</li>
          <li>🐰 CodeRabbit для AI code review</li>
          <li>🔍 Скриншот тестирование и визуальная регрессия</li>
          <li>🎯 Создание тестовых сценариев для AI</li>
        </ul>
        <button class="btn" @click="closeModal">Закрыть</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// Реактивное состояние для тестов
const testInput = ref('')
const counter = ref(0)
const selectedOption = ref('')
const showModal = ref(false)
const testCount = ref(42)
const componentsCount = ref(15)
const issuesFound = ref(7)

const checkboxes = reactive({
  option1: false,
  option2: true,
  option3: false
})

// Методы для тестирования
const simulateMomenticTest = () => {
  console.log('🚀 Momentic тест запущен!')
  alert('Momentic AI тест запущен! Проверяем страницу...')

  // Имитация теста
  testCount.value += 1
}

const navigateToTesting = () => {
  navigateTo('/testing')
}

const takeScreenshot = () => {
  console.log('📸 Скриншот сделан!')
  alert('Скриншот сохранен!')
}

const showAbout = () => {
  showModal.value = true
}

const closeModal = () => {
  showModal.value = false
}

const toggleTheme = () => {
  document.body.classList.toggle('dark-theme')
  alert('Тема переключена!')
}

const showNotification = (message: string) => {
  alert(message)
}

const toggleCounter = () => {
  counter.value++
}

const showError = () => {
  // Создаем "ошибку" для тестирования
  const errorDiv = document.createElement('div')
  errorDiv.className = 'error-message'
  errorDiv.innerHTML = '⚠️ Это тестовая ошибка для Momentic AI'
  errorDiv.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    background: #ff4444;
    color: white;
    padding: 15px;
    border-radius: 8px;
    z-index: 1000;
    animation: fadeIn 0.3s;
  `
  document.body.appendChild(errorDiv)

  setTimeout(() => errorDiv.remove(), 3000)
}

// Для тестирования lifecycle hooks
onMounted(() => {
  console.log('✅ Главная страница загружена')
})

onUnmounted(() => {
  console.log('🚫 Главная страница размонтирована')
})
</script>

<style scoped>
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, sans-serif;
}

.header {
  text-align: center;
  margin-bottom: 40px;
  padding: 30px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border-radius: 12px;
}

.header h1 {
  font-size: 3em;
  margin-bottom: 10px;
}

.subtitle {
  font-size: 1.2em;
  opacity: 0.9;
}

.navigation {
  margin-bottom: 40px;
}

.navigation ul {
  display: flex;
  justify-content: center;
  gap: 30px;
  list-style: none;
  padding: 0;
}

.nav-link {
  text-decoration: none;
  color: #667eea;
  font-weight: 600;
  padding: 10px 20px;
  border-radius: 8px;
  transition: all 0.3s;
}

.nav-link:hover {
  background: #f0f4ff;
  transform: translateY(-2px);
}

.main-content {
  display: flex;
  flex-direction: column;
  gap: 40px;
}

.hero h2 {
  color: #333;
  margin-bottom: 20px;
}

.features {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 25px;
  margin-top: 30px;
}

.feature-card {
  background: white;
  padding: 25px;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.08);
  text-align: center;
  transition: transform 0.3s;
}

.feature-card:hover {
  transform: translateY(-5px);
}

.feature-icon {
  font-size: 3em;
  margin-bottom: 15px;
}

.feature-btn {
  margin-top: 15px;
  padding: 10px 20px;
  background: #667eea;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background 0.3s;
}

.feature-btn:hover {
  background: #5a6fd8;
}

.stats {
  background: #f8f9fa;
  padding: 30px;
  border-radius: 12px;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  margin-top: 20px;
}

.stat-item {
  text-align: center;
  padding: 20px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.05);
}

.stat-number {
  display: block;
  font-size: 2.5em;
  font-weight: bold;
  color: #667eea;
  margin-bottom: 5px;
}

.stat-label {
  color: #666;
  font-size: 0.9em;
}

.interactive {
  background: white;
  padding: 30px;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.08);
}

.form-group {
  margin-bottom: 25px;
}

.form-input, .form-select {
  width: 100%;
  padding: 12px;
  margin-top: 8px;
  border: 2px solid #e0e0e0;
  border-radius: 6px;
  font-size: 16px;
  transition: border-color 0.3s;
}

.form-input:focus, .form-select:focus {
  outline: none;
  border-color: #667eea;
}

.button-group {
  display: flex;
  gap: 15px;
  margin: 25px 0;
  flex-wrap: wrap;
}

.btn {
  padding: 12px 24px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.3s;
}

.btn.primary {
  background: #4CAF50;
  color: white;
}

.btn.secondary {
  background: #2196F3;
  color: white;
}

.btn.danger {
  background: #f44336;
  color: white;
}

.btn:hover {
  opacity: 0.9;
  transform: translateY(-2px);
}

.checkbox-group {
  display: flex;
  gap: 20px;
  margin: 25px 0;
}

.checkbox-group label {
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
}

.dropdown {
  margin-top: 25px;
}

.footer {
  margin-top: 50px;
  text-align: center;
  padding: 20px;
  color: #666;
  border-top: 1px solid #eee;
}

.footer-hint {
  font-size: 0.9em;
  color: #999;
  margin-top: 10px;
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0,0,0,0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal {
  background: white;
  padding: 30px;
  border-radius: 12px;
  max-width: 500px;
  width: 90%;
  max-height: 80vh;
  overflow-y: auto;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

/* Тёмная тема */
.dark-theme .container {
  background: #1a1a1a;
  color: white;
}

.dark-theme .feature-card,
.dark-theme .stat-item,
.dark-theme .interactive {
  background: #2d2d2d;
  color: white;
}

.dark-theme .form-input,
.dark-theme .form-select {
  background: #3d3d3d;
  border-color: #555;
  color: white;
}
</style>