<!-- pages/testing.vue -->
<template>
  <div class="testing-page">
    <header class="testing-header">
      <h1 data-testid="testing-title">🧪 Тестирование CodeRabbit</h1>
      <p>Страница с проблемными компонентами для AI-ревью</p>
      <NuxtLink to="/" class="back-link">← На главную</NuxtLink>
    </header>

    <div class="testing-content">
      <!-- Раздел 1: Проблемные компоненты -->
      <section class="problem-section">
        <h2>⚠️ Проблемные компоненты</h2>
        <p>Эти компоненты содержат намеренные ошибки для тестирования CodeRabbit</p>

        <div class="problem-grid">
          <!-- Компонент 1: Безопасность -->
          <div class="problem-card" data-testid="security-problem">
            <h3>🔒 Проблемы безопасности</h3>
            <ul>
              <li>Хардкод API ключей</li>
              <li>eval() в коде</li>
              <li>Потенциальный XSS</li>
            </ul>
            <button class="problem-btn" @click="showSecurityCode">
              Показать код
            </button>
          </div>

          <!-- Компонент 2: Производительность -->
          <div class="problem-card" data-testid="performance-problem">
            <h3>⚡ Проблемы производительности</h3>
            <ul>
              <li>Глубокие watch без необходимости</li>
              <li>Неоптимизированные computed</li>
              <li>Утечки памяти</li>
            </ul>
            <button class="problem-btn" @click="showPerformanceCode">
              Показать код
            </button>
          </div>

          <!-- Компонент 3: Vue специфика -->
          <div class="problem-card" data-testid="vue-problem">
            <h3>🎯 Vue/Nuxt антипаттерны</h3>
            <ul>
              <li>v-for без :key</li>
              <li>Прямой DOM доступ</li>
              <li>Слишком большие компоненты</li>
            </ul>
            <button class="problem-btn" @click="showVueCode">
              Показать код
            </button>
          </div>
        </div>
      </section>

      <!-- Раздел 2: Примеры кода с ошибками -->
      <section class="code-section">
        <h2>💻 Примеры проблемного кода</h2>

        <div class="code-example">
          <h4>❌ Проблема: Хардкод API ключа</h4>
          <pre><code>const API_KEY = 'sk-live-1234567890abcdef' // Опасно!</code></pre>
        </div>

        <div class="code-example">
          <h4>❌ Проблема: eval() использование</h4>
          <pre><code>function dangerous(code) {
  return eval(code) // Никогда так не делайте!
}</code></pre>
        </div>

        <div class="code-example">
          <h4>❌ Проблема: v-for без :key</h4>
          <pre><code>&lt;div v-for="item in items"&gt;
  {{ item.name }}
&lt;/div&gt;</code></pre>
        </div>
      </section>

      <!-- Раздел 3: Форма для тестирования -->
      <section class="test-form-section">
        <h2>📝 Тестовая форма</h2>

        <form @submit.prevent="submitForm" class="test-form">
          <div class="form-row">
            <label>
              Имя:
              <input
                  v-model="form.name"
                  placeholder="Введите имя"
                  data-testid="form-name"
              />
            </label>
            <label>
              Email:
              <input
                  v-model="form.email"
                  type="email"
                  placeholder="test@example.com"
                  data-testid="form-email"
              />
            </label>
          </div>

          <div class="form-row">
            <label>
              Сообщение:
              <textarea
                  v-model="form.message"
                  rows="4"
                  placeholder="Введите сообщение..."
                  data-testid="form-message"
              ></textarea>
            </label>
          </div>

          <div class="form-actions">
            <button
                type="submit"
                class="submit-btn"
                data-testid="form-submit"
            >
              Отправить
            </button>
            <button
                type="button"
                class="reset-btn"
                @click="resetForm"
            >
              Сбросить
            </button>
          </div>
        </form>

        <div v-if="formSubmitted" class="form-result">
          <h4>✅ Форма отправлена!</h4>
          <pre>{{ form }}</pre>
        </div>
      </section>

      <!-- Раздел 4: Интерактивные элементы -->
      <section class="interactive-section">
        <h2>🎮 Интерактивные элементы для тестов</h2>

        <div class="interactive-grid">
          <div class="interactive-item">
            <h4>Загрузка файла</h4>
            <input
                type="file"
                @change="handleFileUpload"
                data-testid="file-upload"
            />
            <p v-if="uploadedFile">{{ uploadedFile.name }} загружен</p>
          </div>

          <div class="interactive-item">
            <h4>Переключение темы</h4>
            <label class="toggle">
              <input
                  type="checkbox"
                  v-model="darkMode"
                  data-testid="theme-toggle"
              />
              <span class="slider"></span>
              Тёмная тема: {{ darkMode ? 'Вкл' : 'Выкл' }}
            </label>
          </div>

          <div class="interactive-item">
            <h4>Прогресс бар</h4>
            <div class="progress-bar">
              <div
                  class="progress-fill"
                  :style="{ width: progress + '%' }"
              ></div>
            </div>
            <button
                @click="startProgress"
                data-testid="progress-btn"
            >
              Запустить прогресс
            </button>
            <p>Прогресс: {{ progress }}%</p>
          </div>
        </div>
      </section>

      <!-- Раздел 5: Состояния UI -->
      <section class="ui-states">
        <h2>🎭 Разные состояния UI</h2>

        <div class="states-grid">
          <div class="state-card loading-state" data-testid="loading-state">
            <div class="spinner"></div>
            <p>Загрузка...</p>
          </div>

          <div class="state-card error-state" data-testid="error-state">
            <div class="error-icon">❌</div>
            <p>Ошибка загрузки</p>
            <button @click="retry">Повторить</button>
          </div>

          <div class="state-card success-state" data-testid="success-state">
            <div class="success-icon">✅</div>
            <p>Успешно выполнено!</p>
          </div>

          <div class="state-card empty-state" data-testid="empty-state">
            <div class="empty-icon">📭</div>
            <p>Нет данных</p>
            <button @click="loadData">Загрузить данные</button>
          </div>
        </div>
      </section>
    </div>

    <!-- Кодовая модалка -->
    <div v-if="showCodeModal" class="code-modal-overlay" @click="closeCodeModal">
      <div class="code-modal" @click.stop>
        <h3>{{ codeModalTitle }}</h3>
        <pre><code>{{ codeModalContent }}</code></pre>
        <button class="close-btn" @click="closeCodeModal">Закрыть</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// Реактивное состояние
const form = reactive({
  name: '',
  email: '',
  message: ''
})

const formSubmitted = ref(false)
const uploadedFile = ref<File | null>(null)
const darkMode = ref(false)
const progress = ref(0)
const showCodeModal = ref(false)
const codeModalTitle = ref('')
const codeModalContent = ref('')

// Методы
const submitForm = () => {
  console.log('Форма отправлена:', form)
  formSubmitted.value = true

  // Имитация отправки
  setTimeout(() => {
    alert('Форма успешно отправлена!')
  }, 500)
}

const resetForm = () => {
  form.name = ''
  form.email = ''
  form.message = ''
  formSubmitted.value = false
}

const handleFileUpload = (event: Event) => {
  const input = event.target as HTMLInputElement
  if (input.files?.length) {
    uploadedFile.value = input.files[0]
  }
}

const startProgress = () => {
  progress.value = 0
  const interval = setInterval(() => {
    progress.value += 10
    if (progress.value >= 100) {
      clearInterval(interval)
    }
  }, 200)
}

const showSecurityCode = () => {
  codeModalTitle.value = '🔒 Проблемы безопасности'
  codeModalContent.value = `
// ❌ ОПАСНЫЙ КОД!
const API_KEY = 'sk-live-1234567890'

function processUserInput(input) {
  // eval - никогда не используйте в продакшене!
  return eval(input)
}

function renderUserContent(content) {
  // Потенциальный XSS
  return \`<div>\${content}</div>\`
}

// Хранение пароля в localStorage
localStorage.setItem('password', 'secret123')
  `
  showCodeModal.value = true
}

const showPerformanceCode = () => {
  codeModalTitle.value = '⚡ Проблемы производительности'
  codeModalContent.value = `
// ❌ МЕДЛЕННЫЙ КОД
const largeArray = ref(new Array(10000).fill('data'))

// Глубокий watch на большом массиве
watch(largeArray, () => {
  console.log('Массив изменился')
}, { deep: true })

// Неоптимизированный computed
const processedData = computed(() => {
  return largeArray.value.map(item => {
    // Тяжёлые вычисления
    return JSON.parse(JSON.stringify(item))
  })
})

// Утечка памяти
onMounted(() => {
  setInterval(() => {
    // Никогда не очищается
    console.log('Тик')
  }, 1000)
})
  `
  showCodeModal.value = true
}

const showVueCode = () => {
  codeModalTitle.value = '🎯 Vue/Nuxt антипаттерны'
  codeModalContent.value = `
<!-- ❌ АНТИПАТТЕРНЫ VUE -->
<template>
  <!-- v-for без :key -->
  <div v-for="item in items">
    {{ item.name }}
  </div>

  <!-- Прямой DOM доступ -->
  <button @click="updateDom">Обновить DOM</button>

  <!-- v-html без санитизации -->
  <div v-html="userContent"></div>
</template>

<script setup>
// Слишком большой компонент (300+ строк)
// Смешивание логики и UI

// Прямой DOM доступ
function updateDom() {
  document.querySelector('.element').style.color = 'red'
}

// Отсутствие cleanup
onMounted(() => {
  window.addEventListener('resize', handleResize)
})
<\/script>
  `
  showCodeModal.value = true
}

const closeCodeModal = () => {
  showCodeModal.value = false
}

const retry = () => {
  alert('Повторная попытка...')
}

const loadData = () => {
  alert('Загрузка данных...')
}

// Наблюдаем за темой
watch(darkMode, (value) => {
  if (value) {
    document.body.classList.add('dark-theme')
  } else {
    document.body.classList.remove('dark-theme')
  }
})
</script>

<style scoped>
.testing-page {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.testing-header {
  text-align: center;
  margin-bottom: 40px;
  padding: 30px;
  background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
  color: white;
  border-radius: 12px;
}

.testing-header h1 {
  font-size: 2.5em;
  margin-bottom: 10px;
}

.back-link {
  display: inline-block;
  margin-top: 20px;
  color: white;
  text-decoration: none;
  font-weight: 600;
}

.testing-content {
  display: flex;
  flex-direction: column;
  gap: 50px;
}

.problem-section {
  background: #fff8e1;
  padding: 30px;
  border-radius: 12px;
  border-left: 5px solid #ffb300;
}

.problem-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
  margin-top: 20px;
}

.problem-card {
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
}

.problem-card h3 {
  color: #d32f2f;
  margin-bottom: 15px;
}

.problem-card ul {
  list-style: none;
  padding: 0;
}

.problem-card li {
  padding: 5px 0;
  border-bottom: 1px solid #eee;
}

.problem-btn {
  margin-top: 15px;
  padding: 10px 20px;
  background: #ff5252;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
}

.code-section {
  background: #f5f5f5;
  padding: 30px;
  border-radius: 12px;
}

.code-example {
  background: #2d2d2d;
  color: #f8f8f2;
  padding: 20px;
  border-radius: 8px;
  margin: 15px 0;
  overflow-x: auto;
}

.code-example h4 {
  color: #ff79c6;
  margin-bottom: 10px;
}

.test-form-section {
  background: white;
  padding: 30px;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.08);
}

.test-form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.form-row {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
}

.form-row label {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.form-row input,
.form-row textarea {
  padding: 12px;
  border: 2px solid #ddd;
  border-radius: 6px;
  font-size: 16px;
}

.form-row input:focus,
.form-row textarea:focus {
  outline: none;
  border-color: #667eea;
}

.form-actions {
  display: flex;
  gap: 15px;
}

.submit-btn {
  padding: 12px 30px;
  background: #4CAF50;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
}

.reset-btn {
  padding: 12px 30px;
  background: #757575;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
}

.form-result {
  margin-top: 20px;
  padding: 20px;
  background: #e8f5e9;
  border-radius: 8px;
}

.interactive-section {
  background: #e3f2fd;
  padding: 30px;
  border-radius: 12px;
}

.interactive-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 30px;
  margin-top: 20px;
}

.interactive-item {
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
}

.toggle {
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
}

.slider {
  position: relative;
  width: 60px;
  height: 30px;
  background: #ccc;
  border-radius: 15px;
  transition: 0.4s;
}

.slider:before {
  content: "";
  position: absolute;
  width: 26px;
  height: 26px;
  left: 2px;
  bottom: 2px;
  background: white;
  border-radius: 50%;
  transition: 0.4s;
}

input:checked + .slider {
  background: #4CAF50;
}

input:checked + .slider:before {
  transform: translateX(30px);
}

.progress-bar {
  height: 20px;
  background: #e0e0e0;
  border-radius: 10px;
  overflow: hidden;
  margin: 10px 0;
}

.progress-fill {
  height: 100%;
  background: #4CAF50;
  transition: width 0.3s;
}

.ui-states {
  background: #f3e5f5;
  padding: 30px;
  border-radius: 12px;
}

.states-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  margin-top: 20px;
}

.state-card {
  padding: 30px;
  border-radius: 8px;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
}

.loading-state {
  background: #fff3e0;
}

.error-state {
  background: #ffebee;
}

.success-state {
  background: #e8f5e9;
}

.empty-state {
  background: #f5f5f5;
}

.spinner {
  width: 40px;
  height: 40px;
  border: 4px solid #ddd;
  border-top: 4px solid #ff9800;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.error-icon, .success-icon, .empty-icon {
  font-size: 2.5em;
}

.code-modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0,0,0,0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.code-modal {
  background: #1e1e1e;
  color: #d4d4d4;
  padding: 30px;
  border-radius: 12px;
  max-width: 800px;
  width: 90%;
  max-height: 80vh;
  overflow-y: auto;
}

.code-modal pre {
  background: #252526;
  padding: 20px;
  border-radius: 8px;
  overflow-x: auto;
}

.code-modal code {
  color: #d4d4d4;
  font-family: 'Courier New', monospace;
  font-size: 14px;
}

.close-btn {
  margin-top: 20px;
  padding: 10px 20px;
  background: #007acc;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
}
</style>