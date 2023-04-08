<template>
  <div class="container">
    <Header :length="32" @create="append"/>
    <List :todos="todos"/>
    <Footer :todos="todos" @clean="clean"/>
  </div>
</template>

<script lang="ts" setup>
import Header from './components/Header.vue';
import Footer from './components/Footer.vue';
import List from './components/List.vue';
import { onMounted, provide, ref, watch } from 'vue';
import storage from './util/storage';

// task list
const todos = ref<TodoType.Todo[]>([]);
/*// 计算已完成
const info = computed(() => {
  let count = 0;
  let length = todos.value.length;
  // foreach
  todos.value.forEach((todo) => {
    if (todo.selected) count++;
  });
  return { count, length };
});*/
// func append
const append = (todo: TodoType.Todo) => {
  todos.value.push(todo);
};
// remove
const remove = (id: number) => {
  todos.value = todos.value.filter((todo) => todo.id !== id);
};
// remove
const clean = () => {
  todos.value = todos.value.filter((todo) => !todo.selected);
};
onMounted(() => {
  todos.value = storage.getItem();
});
// watch
watch(() => todos.value, () => storage.setItem(todos.value), { deep: true });
// 穿透
provide('remove', remove);
</script>

<style scoped>
.container {
  width: 768px;
  height: auto;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  box-shadow: 0 0 21px rgba(0, 0, 0, 0.07);
}
</style>