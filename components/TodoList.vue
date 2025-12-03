<!-- TodoList.vue -->
<template>
  <div class="todo-list">
    <h1>{{ title }}</h1>

    <!-- Форма добавления задачи -->
    <div class="add-todo">
      <input
          v-model="newTodoText"
          type="text"
          placeholder="Что нужно сделать?"
          @keyup.enter="addTodo"
          class="todo-input"
      />
      <button @click="addTodo" class="add-btn">
        Добавить
      </button>
    </div>

    <!-- Фильтры -->
    <div class="filters">
      <button
          @click="filter = 'all'"
          :class="{ active: filter === 'all' }"
      >
        Все ({{ todos.length }})
      </button>
      <button
          @click="filter = 'active'"
          :class="{ active: filter === 'active' }"
      >
        Активные ({{ activeTodosCount }})
      </button>
      <button
          @click="filter = 'completed'"
          :class="{ active: filter === 'completed' }"
      >
        Завершенные ({{ completedTodosCount }})
      </button>
    </div>

    <!-- Список задач -->
    <ul class="todos" v-if="filteredTodos.length > 0">
      <li
          v-for="todo in filteredTodos"
          :key="todo.id"
          :class="{ completed: todo.completed }"
          class="todo-item"
      >
        <input
            type="checkbox"
            v-model="todo.completed"
            class="todo-checkbox"
        />

        <span
            @dblclick="startEditing(todo)"
            class="todo-text"
        >
          <template v-if="todo.id !== editingId">
            {{ todo.text }}
          </template>
          <input
              v-else
              v-model="todo.text"
              type="text"
              @blur="stopEditing"
              @keyup.enter="stopEditing"
              v-focus
              class="edit-input"
          />
        </span>

        <button @click="removeTodo(todo.id)" class="delete-btn">
          ×
        </button>
      </li>
    </ul>

    <!-- Сообщение если нет задач -->
    <div v-else class="empty-state">
      <p v-if="filter === 'all'">🎉 Пока нет задач! Добавьте первую.</p>
      <p v-if="filter === 'active'">✅ Все задачи выполнены!</p>
      <p v-if="filter === 'completed'">📝 Нет завершенных задач.</p>
    </div>

    <!-- Статистика -->
    <div class="stats">
      <span v-if="todos.length > 0">
        Осталось выполнить: {{ activeTodosCount }}
      </span>
      <button
          v-if="completedTodosCount > 0"
          @click="clearCompleted"
          class="clear-btn"
      >
        Удалить завершенные
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'

// Пропсы
const props = defineProps({
  title: {
    type: String,
    default: 'Мой список задач'
  }
})

// Реактивные переменные
const todos = ref([])
const newTodoText = ref('')
const filter = ref('all')
const editingId = ref(null)

// Директива автофокуса для редактирования
const vFocus = {
  mounted: (el) => el.focus()
}

// Вычисляемые свойства
const activeTodosCount = computed(() =>
    todos.value.filter(t => !t.completed).length
)

const completedTodosCount = computed(() =>
    todos.value.filter(t => t.completed).length
)

const filteredTodos = computed(() => {
  switch (filter.value) {
    case 'active':
      return todos.value.filter(t => !t.completed)
    case 'completed':
      return todos.value.filter(t => t.completed)
    default:
      return todos.value
  }
})

// Методы
const addTodo = () => {
  const text = newTodoText.value.trim()
  if (!text) return

  todos.value.push({
    id: Date.now(),
    text: text,
    completed: false,
    createdAt: new Date().toISOString()
  })

  newTodoText.value = ''
  saveToLocalStorage()
}

const removeTodo = (id) => {
  todos.value = todos.value.filter(t => t.id !== id)
  saveToLocalStorage()
}

const startEditing = (todo) => {
  editingId.value = todo.id
}

const stopEditing = () => {
  editingId.value = null
  saveToLocalStorage()
}

const clearCompleted = () => {
  todos.value = todos.value.filter(t => !t.completed)
  saveToLocalStorage()
}

// Сохранение в localStorage
const saveToLocalStorage = () => {
  localStorage.setItem('vue-todos', JSON.stringify(todos.value))
}

const loadFromLocalStorage = () => {
  const saved = localStorage.getItem('vue-todos')
  if (saved) {
    todos.value = JSON.parse(saved)
  }
}

// Загрузка данных при монтировании
onMounted(() => {
  loadFromLocalStorage()
})
</script>

<style scoped>
.todo-list {
  max-width: 500px;
  margin: 0 auto;
  padding: 20px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
}

h1 {
  text-align: center;
  color: #333;
  margin-bottom: 30px;
}

.add-todo {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
}

.todo-input {
  flex: 1;
  padding: 12px 15px;
  border: 2px solid #ddd;
  border-radius: 8px;
  font-size: 16px;
  transition: border-color 0.3s;
}

.todo-input:focus {
  outline: none;
  border-color: #646cff;
}

.add-btn {
  padding: 12px 24px;
  background: #646cff;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  cursor: pointer;
  transition: background 0.3s;
}

.add-btn:hover {
  background: #535bf2;
}

.filters {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
  justify-content: center;
}

.filters button {
  padding: 8px 16px;
  background: #f5f5f5;
  border: 1px solid #ddd;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.3s;
}

.filters button.active {
  background: #646cff;
  color: white;
  border-color: #646cff;
}

.todos {
  list-style: none;
  padding: 0;
  margin: 0 0 20px 0;
}

.todo-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 15px;
  background: white;
  border: 1px solid #eee;
  border-radius: 8px;
  margin-bottom: 10px;
  transition: all 0.3s;
}

.todo-item:hover {
  border-color: #ddd;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

.todo-item.completed {
  opacity: 0.7;
  background: #f9f9f9;
}

.todo-checkbox {
  width: 20px;
  height: 20px;
  cursor: pointer;
}

.todo-text {
  flex: 1;
  font-size: 16px;
  cursor: pointer;
  word-break: break-word;
}

.todo-item.completed .todo-text {
  text-decoration: line-through;
  color: #888;
}

.edit-input {
  flex: 1;
  padding: 8px;
  border: 2px solid #646cff;
  border-radius: 4px;
  font-size: 16px;
}

.delete-btn {
  width: 30px;
  height: 30px;
  background: #ff6b6b;
  color: white;
  border: none;
  border-radius: 50%;
  font-size: 20px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.3s;
}

.delete-btn:hover {
  background: #ff5252;
}

.empty-state {
  text-align: center;
  padding: 40px 20px;
  color: #666;
  font-size: 18px;
}

.stats {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 20px;
  border-top: 1px solid #eee;
  color: #666;
}

.clear-btn {
  padding: 8px 16px;
  background: #ff6b6b;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background 0.3s;
}

.clear-btn:hover {
  background: #ff5252;
}
</style>