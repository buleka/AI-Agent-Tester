// tests/ai-prompt-test.spec.ts
import { test } from 'momentic'

test('AI тест по промпту', async ({ ai }) => {
    await ai.run(`
    Как тестировщик:
    1. Зайди на сайт http://localhost:3000
    2. Найди все кнопки
    3. Нажми на каждую кнопку
    4. Убедись, что ничего не сломалось
    5. Сделай скриншоты всех состояний
  `)
})