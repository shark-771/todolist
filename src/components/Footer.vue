<template>
  <div class="footer">
    <label>
      <input type="checkbox" @click="select(choose)" v-model="choose">
      <span>完成 {{ count }} / 总计 {{ todos.length }}</span>
    </label>
    <button @click="remove">清除已完成</button>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue';

// 通信
const props = defineProps<{ todos: TodoType.Todo[] }>();
const emits = defineEmits(['clean']);

// todos info
const count = computed(() => {
  let size = 0;
  // count
  props.todos.forEach((todo) => {
    if (todo.selected) size++;
  });
  return size;
});
const choose = computed(() => {
  return count.value === props.todos.length;
});
// 全选
const select = (flag: boolean) => {
  props.todos.forEach((todo) => {
    todo.selected = !flag;
  });
};
const remove = () => {
  emits('clean');
};
</script>

<style scoped>
.footer {
  width: 768px;
  height: 64px;
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  padding: 8px 16px;
  border-top: 1px solid black;
}

.footer label input {
  width: 16px;
  height: 16px;
  vertical-align: middle;
}

.footer label span {
  font-size: 16px;
  margin-left: 4px;
  vertical-align: middle;
}

.footer button {
}
</style>